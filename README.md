Todo Calendar App (Full-Stack: Django + React)

This is a full-stack "Todo Calendar" application where users can add, update, delete, and filter tasks (todos) with date and time slots. The backend is built using "Django REST Framework", and the frontend is built with "React.js".

 Tech Stack
                       
 Frontend  ----->  React, JavaScript, HTML, CSS        
 Backend  ----->  Django, Django REST Framework       
 Database ----->  SQLite (default, via Django ORM)    
 Dev Tools ----->  VS Code, npm, pip, logging, CORS    

BACKEND- DJANGO SETUP

Python Version
- Python 3.10+
- Django 4.2+

 1. Create a Virtual Environment

in bash/terminal

	python -m venv env
	env\Scripts\activate [For Windows] or source env/bin/activate [for linux]


2. Install dependencies:

	pip install -r requirements.txt

3. Setup Database (SQLite)

	python manage.py migrate


4. Run the Backend Server

	python manage.py runserver

Backend is live at:
	
	http://localhost:8000/


FRONTEND-REACT SETUP

1. Install Dependencies
	
	npm install

2. Start the React App

	npm start

Frontend is live at:

	http://localhost:3000/

API ENDPOINTS:

| Method   |        URL         | Description    |
| ----------- | -------------------| ------------------|
| GET       | `/todos/`         | List all todos    |
| POST     | `/todos/`         | Create a todo  |
| PUT        | `/todos/<id>/` | Update a todo  |
| DELETE  | `/todos/<id>/` | Delete a todo   |
	

Folder Structure:
todo-calendar/
├── backend/
│   ├── todos/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── admin.py
│   ├── todo_calendar/
│   │   ├── settings.py
│   │   └── urls.py
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json

