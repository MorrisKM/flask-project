from flask_restx import Namespace, Resource, fields
from models import User
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token

user_ns = Namespace('User', description="This is a user namespace")

#user model (serialize)
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
user_model = user_ns.model(
  'UserDetails',
  {
    "username" : fields.String(),
    "email": fields.String(),
    "password" : fields.String(),
    "first_name": fields.String(),
    "category" : fields.String(),
    "last_name" : fields.String(),
    "phone_number" : fields.String(),
    "age" : fields.Integer()
  }
)

login_model = user_ns.model(
  "login",
  {
    "username" : fields.String(),
    "password" : fields.String()
  }
)

#a signup route
@user_ns.route("/signup")
class SignUp(Resource):
  @user_ns.expect(user_model)
  def post(self):
    #getting the response request from the client 
    data = request.get_json()

    #validating if user is already in the database/ registered
    username = data.get("username")
    db_user = User.query.filter_by(username=username).first()
    if db_user is not None:
      return jsonify({"message" : f'User with username: {username} already exists'})
    
    #adding the user to the database 
    new_user = User(
      username = data.get("username"),
      email= data.get("email"),
      #hashing the password
      password_hash = generate_password_hash(data.get("password")),
      first_name= data.get("first_name"),
      category = data.get("category"),
      last_name = data.get("last_name"),
      phone_number = data.get("phone_number"),
      age = data.get("age")
    )
    new_user.save()

    return jsonify({"message": f"user: {username} created successfully"})


@user_ns.route("/login")
class LogIn(Resource):
  @user_ns.expect(login_model)
  def post(self):
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    #verifying the user and creating access tokens for the api
    user_db = User.query.filter_by(username = username).first()
    if user_db and check_password_hash(user_db.password_hash, password):
      access_token = create_access_token(identity=user_db.username)
      refresh_token = create_refresh_token(identity=user_db.username)

      return jsonify(
        {
          "access_token": access_token,
          "refresh_token": refresh_token
        }
      )
    
    else:
      return jsonify({"message": "invalid credentials or username does not exist"})
