# Flask Event Project

A web application built with Flask as the backend API and a frontend served from a built static folder. This project demonstrates a full-stack setup with Flask RESTful API, JWT authentication, database migrations, and a frontend using modern JavaScript tooling.

## Features
- REST API implemented with Flask-RESTx
- User authentication with Flask-JWT-Extended
- Database integration and migrations via SQLAlchemy and Flask-Migrate
- CORS enabled for cross-origin resource sharing
- Frontend built and served as static files from the `frontend/dist` folder
- Modular route namespaces for users, events, venues, and RSVPs
- Environment configuration with dotenv

## EventHub - Event Planning Platform
A full-stack web application for creating and managing events, built with Flask backend and modern JavaScript frontend.

# Quick Start
Prerequisites
Python 3.8+

Node.js 14+

# Backend Setup
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

# Frontend Setup
The frontend is built and served automatically from the frontend/dist folder. No separate setup required!

# What You Get
Backend Features:

✅ REST API with Flask-RESTx

🔐 JWT Authentication

🗄️ Database with SQLAlchemy

📊 API Documentation at /docs

# Frontend Features:
🎯 Event creation and management

👥 User registration and login

📍 Venue management
✅ RSVP system

📊 API Endpoints
Users: Registration, login, profile management

Events: Create, read, update, delete events

Venues: Manage event locations

RSVPs: Handle event attendance

🏗️ Project Structure
text
backend/
├── frontend/dist/          # Built frontend files
├── routes/                 # API route namespaces
├── migrations/            # Database migrations
├── models.py              # Database models
├── extensions.py          # Flask extensions
└── run.py                 # Application entry point
🔧 Development
API Docs: Visit /docs after running the app

Database: SQLite with Flask-Migrate for schema changes

Authentication: JWT tokens for secure API access

CORS: Enabled for cross-origin requests

🚀 Deployment Ready
The app is configured for production with:

Static file serving from built frontend

Environment-based configuration

Database migration system
