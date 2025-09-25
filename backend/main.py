from flask import Flask
from flask_restx import Api
from extensions import db
from flask_migrate import Migrate
from models import Event
from flask_cors import CORS
from routes.user import user_ns
from routes.event import event_ns
from routes.venue import venue_ns
from routes.event_rsvp import rsvp_ns
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

load_dotenv()

def create_app(config):
  app = Flask(__name__, static_url_path="/", static_folder="./frontend/dist")
  app.config.from_object(config)
  app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
  db.init_app(app)
  api = Api(app, doc="/docs")
  CORS(app)

  #registering namespaces
  api.add_namespace(user_ns)
  api.add_namespace(event_ns)
  api.add_namespace(venue_ns)
  api.add_namespace(rsvp_ns)

  migrate = Migrate(app, db)
  JWTManager(app)

  @app.route("/")
  def index():
    return app.send_static_file("index.html")

  @app.errorhandler(404)
  def not_found(err):
    return app.send_static_file("index.html")


  return app
