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

  #relationships
  events = db.relationship("Event", back_populates = "organizer")
  event_rsvp = db.relationship("EventRsvp", back_populates='user')

  #methods
  def __repr__(self):
    return f'<User: {self.username}'
  
  def save(self):
    db.session.add(self)
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  def update(self, username, email, first_name, last_name, category, phone_number, age):
    self.username = username
    self.email = email
    self.first_name = first_name
    self.last_name = last_name
    self.category = category
    self.phone_number = phone_number
    self.age = age

    db.session.commit()

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

class Event(db.Model):
  __tablename__ = 'events'
  id = db.Column(db.Integer, primary_key=True)
  venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))
  organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  event_date = db.Column(db.DateTime, nullable=False)
  ticket_price = db.Column(db.Integer, nullable=False)
  picture = db.Column(db.String, nullable= False)
  category = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  #relationships
  venue = db.relationship("Venue", back_populates='events')
  organizer = db.relationship("User", back_populates='events')
  event_rsvp = db.relationship("EventRsvp", back_populates='event')

  #methods
  def __repr__(self):
    return f'<Event: {self.title}'
  
  def save(self):
    db.session.add(self)
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  def update(self, title, description, event_date, ticket_price, picture, category, venue):
    self.title = title 
    self.description = description
    self.event_date = event_date
    self.ticket_price = ticket_price
    self.picture = picture
    self.category = category
    self.venue = venue

    db.session.commit()





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
class Venue(db.Model):
  __tablename__ = "venues"
  id = db.Column(db.Integer, primary_key=True)
  venue_name = db.Column(db.String, nullable=False)
  #owner_name can hold a persons or an organization name
  owner_name = db.Column(db.String, nullable=False)
  owner_email = db.Column(db.String, nullable=False)
  location = db.Column(db.String, nullable=False)
  picture = db.Column(db.String, nullable= False)
  capacity = db.Column(db.Integer, nullable= False)

  #relationships
  events = db.relationship("Event", back_populates = "venue")

  #methods
  def __repr__(self):
    return f'<Venue: {self.venue_name}'
  
  def save(self):
    db.session.add(self)
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  def update(self, venue_name, owner_name, owner_email, location, picture, capacity):
    self.venue_name = venue_name 
    self.owner_name = owner_name
    self.owner_email = owner_email
    self.location = location
    self.picture = picture
    self.capacity = capacity

    db.session.commit()



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

class EventRsvp(db.Model):
  __tablename__ = 'event_rsvps'
  id = db.Column(db.Integer, primary_key=True)
  event_id = db.Column(db.Integer, db.ForeignKey('events.id', name='fk_eventrsvp_event_id'))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_eventrsvp_user_id'))
  dietary_preference = db.Column(db.String, nullable=False)
  special_request = db.Column(db.String, nullable=False)
  rsvp_status = db.Column(db.String, nullable=False)
  rsvp_date = db.Column(db.DateTime, default=datetime.utcnow)


  #relationships
  event = db.relationship("Event", back_populates='event_rsvp')
  user = db.relationship("User", back_populates='event_rsvp')

  #methods
  def __repr__(self):
    return f'<Venue: {self.venue_name}'
  
  def save(self):
    db.session.add(self)
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  def update(self,event_id, user_id, dietary_preference, special_request, rsvp_status):
    self.event_id = event_id
    self.user_id = user_id
    self.dietary_preference = dietary_preference 
    self.special_request = special_request
    self.rsvp_status = rsvp_status


    db.session.commit()
