from extensions import db
from datetime import datetime

"""
class User:
  id: integer
  username: String
  email: String
  password_hash: Text
  first_name: String
  category: String
  last_name: String
  phone_number: String
  age: Integer
  created_at: DateTime
"""

class User(db.Model):
  __tablename__ =  'users'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(25), nullable=False, unique=True)
  email = db.Column(db.String(80), nullable=False, unique=True)
  password_hash = db.Column(db.Text, nullable=False, unique=True)
  first_name = db.Column(db.String, nullable=False)
  category = db.Column(db.String)
  last_name = db.Column(db.String, nullable=False)
  phone_number = db.Column(db.String, nullable=False)
  age = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

"""
class Event:
  id: integer
  venue_id: Integer
  organizer_id: Integer
  title: String
  description: String
  event_date: DateTime
  ticket_price: Integer
  category: String
  created_at: DateTime
"""

class Event(db.Model):
  __tablename__ = 'events'
  id = db.Column(db.Integer, primary_key=True)
  venue_id = db.Column(db.Integer, db.Foreign_key('venues.id'))
  organizer_id = db.Column(db.Integer, db.Foreign_key('users.id'))
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  event_date = db.Column(db.DateTime, nullable=False)
  ticket_price = db.Column(db.Integer, nullable=False)
  category = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)





"""
class Venue:
  id: integer
  owner_name: String
  owner_email: String
  name: String
  location: String
  capacity: Integer
"""

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