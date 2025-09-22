from flask import Flask
from flask_restx import Api
from config import DevConfig
from extensions import db
from flask_migrate import Migrate
from models import Event
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)
api = Api(app, doc="/docs")
migrate = Migrate(app, db)
CORS(app)


if __name__ == "__main__":
  app.run()
