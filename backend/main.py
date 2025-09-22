from flask import Flask
from flask_restx import Api
from config import DevConfig
from extensions import db
from flask_migrate import Migrate
from models import Event
from flask_cors import CORS
from routes.user import user_ns
from routes.event import event_ns
from routes.venue import venue_ns


app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)
api = Api(app, doc="/docs")
CORS(app)

#registering namespaces
api.add_namespace(user_ns)
api.add_namespace(event_ns)
api.add_namespace(venue_ns)

migrate = Migrate(app, db)




if __name__ == "__main__":
  app.run(port=5005)
