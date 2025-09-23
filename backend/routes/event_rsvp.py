from models import EventRsvp, Event, User
from flask import request, jsonify
from flask_restx import Resource, Namespace, fields
from flask_jwt_extended import jwt_required

rsvp_ns = Namespace("rsvp", description="this is a rsvp namespace")

#rsvp serializer
"""
class EventRsvp:
  id: integer
  event_id: Integer
  user_id: Integer
  dietary_preference: String
  special_request: String
  rsvp_status: String
  rsvp_date: DateTime
"""

rsvp_model = rsvp_ns.model(
  "rsvp",
  {
    "event_id": fields.Integer(),
    "user_id": fields.Integer(),
    "dietary_preference": fields.String(),
    "special_request": fields.String(),
    "rsvp_status": fields.String()
  }
)

@rsvp_ns.route("/rsvps")
class EventsResource(Resource):
  @rsvp_ns.marshal_list_with(rsvp_model)
  def get(self):
    rsvps = EventRsvp.query.all()

    return rsvps
  
  @jwt_required()
  def post(self):
    data = request.get_json()
    event_db = Event.query.get_or_404(data.get("event_id"))
    user_db = User.query.get_or_404(data.get('user_id'))

    if event_db is None or user_db is None:
      return jsonify({"message" : "event or user is not valid"})

    new_rsvp = EventRsvp(
      event_id = data.get("event_id"),
      user_id = data.get("user_id"),
      dietary_preference = data.get("dietary_preference"),
      special_request = data.get("special_request"),
      rsvp_status = data.get("rsvp_status"),
    )

    new_rsvp.save()
    return jsonify({"message" : "rsvp created"})

@rsvp_ns.route("/rsvp/<int:id>")
class EventResource(Resource):
  @rsvp_ns.marshal_with(rsvp_model)
  @jwt_required()
  def put(self, id):
    data = request.get_json()
    rsvp_to_update = EventRsvp.query.get_or_404(id)
    rsvp_to_update.update(
      data.get("event_id"),
      data.get("user_id"),
      data.get("dietary_preference"),
      data.get("special_request"),
      data.get("rsvp_status"),
    )

    return rsvp_to_update
  
  @jwt_required()
  def delete(self, id):
    rsvp_to_delete = EventRsvp.query.get_or_404(id)
    rsvp_to_delete.delete()

    return jsonify({"message", f"Event rsvp of id: {id} has been removed"}, 204)
