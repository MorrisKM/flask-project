A full-stack web application for creating and managing events, built with Flask backend and modern JavaScript frontend.

Quick Start
Prerequisites
Python 3.8+

Node.js

Backend Setup
Clone and setup

bash
git clone https://github.com/MorrisKM/flask-project.git
cd flask-project/backend
Create virtual environment

bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
Install dependencies

bash
pip install -r requirements.txt
Setup environment

bash
# Create .env file with:
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
Setup database

bash
flask db upgrade
Run the application

bash
flask run
or for production:

bash
gunicorn run:app
Frontend Setup
The frontend is built and served automatically from the frontend/dist folder. No separate setup required!

 What You Get
Backend Features:

REST API with Flask-RESTx

JWT Authentication

Database with SQLAlchemy

API Documentation at /docs

Frontend Features:

Modern responsive design

Event creation and management

User registration and login

Venue management

RSVP system

API Endpoints
Users: Registration, login, profile management

Events: edit and  delete events

Venues: Manage event locations

RSVPs: Handle event attendance

Project Structure
text
backend/
├── frontend/dist/          # Built frontend files
├── routes/                 # API route namespaces
├── migrations/            # Database migrations
├── models.py              # Database models
├── extensions.py          # Flask extensions
└── run.py                 # Application entry point
Development
API Docs: Visit /docs after running the app

Database: SQLite with Flask-Migrate for schema changes

Authentication: JWT tokens for secure API access

CORS: Enabled for cross-origin requests

Deployment Ready
The app is configured for production with:

Static file serving from built frontend

Gunicorn ready

Environment-based configuration

Database migration system
