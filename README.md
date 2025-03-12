Moringa Students Portal - Backend

🚀 Project Overview

Moringa Students Portal is a web application designed to help Moringa School students and administrators manage student information efficiently. Students can register, log in, and access their grades, fee balances, and training phases, while administrators can manage student accounts, payments, and academic records.

🔗 Deployment
Backend (Flask) hosted on Render: Backend Deployment Link (Replace with actual link)
Frontend (React) hosted on Vercel: Frontend Deployment Link (Replace with actual link)


📌 Features

🎓 Student Features
User Authentication: Secure sign-up and login using JWT.
Dashboard: View personal grades, fee balances, and current training phase.
Grades Section: View grades for enrolled courses.
Fee Management: Check outstanding balances and make payments.
Current Phase Tracking: See current phase progress and updates.
Payment Processing: Secure payment integration for fee payments.

🔧 Admin Features
Admin Dashboard: Manage student accounts and records.
Student Management: Add, update, or deactivate student accounts.
Grade Management: Update and view student grades.
Fee & Payment Handling: Manage student payments and track fee records.


🏗 Tech Stack

🔹 Backend (Flask API)
Python + Flask (RESTful API)
PostgreSQL (Database Management)
SQLAlchemy (ORM for database interaction)
Flask-JWT-Extended (Authentication & Authorization)
Flask-CORS (Cross-Origin Resource Sharing)

🔹 Frontend
React (UI Development)
React Router (Navigation)
Axios / Fetch API (HTTP Requests)
Tailwind CSS for styling

🔹 Authentication & Payments
JWT (JSON Web Token) for secure user authentication
Mpesa for payments


⚙️ Setup & Installation

1️⃣ Clone the Repository
$ git clone https://github.com/masindes/Moringa-School-Portal-Backend.git
$ cd Moringa-School-Portal-Backend
2️⃣ Create and Activate Virtual Environment
$ pip install pipenv
$ pipenv shell
3️⃣ Install Dependencies
$ pipenv install
4️⃣  Run Database Migrations
$ flask db upgrade
6️⃣ Start the Server
$ flask run
The server will run on http://127.0.0.1:5000/


🔒 Authentication & Authorization (JWT)

User Registration
Endpoint: POST /register
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "student"
}

User Login

Endpoint: POST /login
