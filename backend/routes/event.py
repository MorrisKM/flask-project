from models import Event, Venue, User
from flask import request, jsonify
from flask_restx import Resource, Namespace, fields
from flask_jwt_extended import jwt_required
from datetime import datetime

event_ns = Namespace("Events", description="this is an events namespace")

#event model serializer
"""
class Event:
  id: integer
  venue_id: Integer
  organizer_id: Integer
  title: String
  description: String
  event_date: DateTime
  ticket_price: Integer
  picture: String
  category: String
  created_at: DateTime
"""

event_model = event_ns.model(
  "event",
  {
    "id": fields.Integer(),
    "title": fields.String(),
    "description": fields.String(),
    "event_date": fields.DateTime(),
    "ticket_price": fields.Integer(),
    "picture": fields.String(),
    "category": fields.String(),
    #the venue should be a drop down from the database and return the venue_id
    "venue_id": fields.Integer(),
    #the organizer should be passed with a user id
    "organizer_id": fields.Integer()
  }
)

#get and post for events
@event_ns.route("/events")
class EventsResource(Resource):
  @event_ns.marshal_list_with(event_model)
  def get(self):
    #query all events from the database
    events = Event.query.all()

    return events
  
  @event_ns.marshal_with(event_model)
  @jwt_required()
  @event_ns.expect(event_model)
  def post(self):
    data = request.get_json()
    venue_id = data.get("venue_id")
    organizer_id = data.get("organizer_id")
    #get venue and user objects
    venue_db = Venue.query.filter_by(id = venue_id).first()
    #get organizer
    organizer_db = User.query.get_or_404(organizer_id)

    html_date = data.get("event_date")
    event_date = datetime.strptime(html_date, "%Y-%m-%d").date()

    new_event = Event(
      venue = venue_db,
      organizer = organizer_db,
      title = data.get("title"),
      description = data.get("description"),
      event_date = event_date,
      ticket_price = data.get("ticket_price"),
      picture = data.get("picture"),
      category = data.get("category"),
    )

    new_event.save()

    return new_event
  

@event_ns.route("/events/<int:id>")
class EventResource(Resource):
  @event_ns.marshal_with(event_model)
  #getting an event by id
  def get(self, id):
    event = Event.query.get_or_404(id)
    return event
  
  #updating an event using put
  @jwt_required()
  @event_ns.marshal_with(event_model)
  @event_ns.expect(event_model)
  def put(self, id):
    event_to_update = Event.query.get_or_404(id)
    data = request.get_json()
    venue_id = data.get("venue_id")
    #get venue and user objects
    venue_db = Venue.query.filter_by(id = venue_id).first()

    event_to_update.update(
      data.get("title"), 
      data.get("description"), 
      data.get("event_date"), 
      data.get("ticket_price"), 
      data.get("picture"), 
      data.get("category"), 
      venue_db)
    
    return event_to_update
  
  @jwt_required()
  def delete(self, id):
    event_to_delete = Event.query.get_or_404(id)
    event_to_delete.delete()

    return jsonify({"message", f"Event: {event_to_delete.title} has been removed"}, 204)


