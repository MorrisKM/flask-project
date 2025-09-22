from models import Venue
from flask import request, jsonify
from flask_restx import Resource, Namespace, fields
from flask_jwt_extended import jwt_required


venue_ns = Namespace("Venue", description="this is venue namespace")
#venue serializer
"""
class Venue:
  id: integer
  venue_name: String
  owner_name: String
  owner_email: String
  location: String
  picture: String
  capacity: Integer
"""
venue_model = venue_ns.model(
  "venue",
  {
    "venue_name" : fields.String(),
    "owner_name" : fields.String(),
    "owner_email": fields.String(),
    "location" : fields.String(),
    "picture": fields.String(),
    "capacity": fields.Integer()
  }
)

@venue_ns.route("/venues")
class VenuesResource(Resource):
  @venue_ns.marshal_list_with(venue_model)
  def get(self):
    venues = Venue.query.all()
    return venues

  @jwt_required
  def post(self):
    data = request.get_json()

    #checking if venue is already in the database
    venue_db = Venue.query.filter_by(venue_name = data.get("venue_name"))
    if venue_db is not None:
      return jsonify({'Message' : f"Venue: {venue_db.venue_name} already exists"})
    
    new_venue = Venue(
      venue_name= data.get("venue_name"),
      owner_name= data.get("owner_name"),
      owner_email= data.get("owner_email"),
      location= data.get("location"),
      picture= data.get("picture"),
      capacity= data.get("capacity")
    )

    #saving the instance to the database 
    new_venue.save()

    return jsonify({"message", f"venue: {new_venue.venue_name} has been added"}, 200)
  

@venue_ns.route("/venues/<int:id>")
class VenueResource(Resource):
  @jwt_required
  @venue_ns.marshal_with(venue_model)
  def put(self, id):
    data = request.get_json()
    venue_to_update = Venue.query.get_or_404(id)

    venue_to_update.update(data.get("venue_name"), data.get("owner_name"), data.get("owner_email"), data.get("location"), data.get("picture"), data.get("capacity"))

    return venue_to_update
  
  @jwt_required
  def delete(self, id):
    venue_to_delete = Venue.query.get_or_404(id)
    venue_to_delete.delete()

    return jsonify({"message", f"Event: {venue_to_delete.title} has been removed"}, 204)


