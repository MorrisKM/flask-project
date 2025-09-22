from extensions import db
from datetime import datetime

"""
class User:
  id: integer
  username: String
  email: String
  password_hash: Text
  first_name: String
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
  last_name = db.Column(db.String, nullable=False)
  phone_number = db.Column(db.String, nullable=False)
  age = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)


