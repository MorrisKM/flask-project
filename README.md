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

## Installation

1. Clone the repository
git clone https://github.com/MorrisKM/flask-project.git
cd flask-project/backend

2. Create and activate a Python virtual environment
python -m venv .venv
source .venv/bin/activate # On Windows use .venv\Scripts\activate


3. Install dependencies

pip install -r requirements.txt


4. Setup environment variables

Create a `.env` file in `backend` with necessary variables, e.g.:

SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_secret_key


5. Run database migrations

flask db upgrade


6. Run the app in development mode
export FLASK_APP=run.py
flask run

or with gunicorn:
gunicorn run:app


## Usage

- Access the API documentation at `/docs`
- Frontend static files are served from `/` routing to `frontend/dist/index.html`
- API endpoints include users, events, venues, and RSVP management

## Project Structure

backend/
├── frontend/ # Frontend source and built assets
│ └── dist/ # Built static files served by Flask
├── instance/ # Database and instance data
├── migrations/ # Alembic database migrations
├── routes/ # Route namespaces for API
├── main.py # App factory and setup
├── run.py # Entry point for running the app
├── config.py # Configuration classes
├── extensions.py # Extension instances (db, jwt, etc)
├── models.py # Database models
└── requirements.txt # Python dependencies


## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and issue a pull request.

## License

This project is opensource 
