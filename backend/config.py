from dotenv import load_dotenv
import os

#to load data inside the dotenv call load_dotenv
load_dotenv()
class Config:
  SECRET_KEY = os.getenv('SECRET_KEY')
  JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
  SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevConfig:
  SQLALCHEMY_DATABASE_URI = "sqlite:///events.db"
  SQLALCHEMY_ECHO=True
  DEBUG=True
