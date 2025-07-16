# School-Management-System


#  School Management System (Team Project)

A full-featured web application to manage students, teachers, classes, subjects, and timetables in a school environment. This project was built collaboratively by our team to streamline school administration tasks.

---

##  Project Overview

Our School Management System is designed to help school administrators and teachers efficiently manage:

- User management (teachers, students, admins)
- Class and section assignments
- Subject assignments to classes and teachers
- Automatic weekly timetable generation using Google OR-Tools optimization library
- Admin dashboard with statistics, filters,paginations and charts
- Bulk import/export of data
-Email sending using SMTP
---

##  Technologies Used

Backend: Laravel 12 (PHP)  
Notification:Toastify
Frontend: React.js + Inertia.js + Tailwind CSS  
Scheduling: Python + Google OR-Tools  
Database: MySQL  
Testing:Postman
Version Control: Git + GitHub  

---

##  Team Collaboration

- We collaborated using **GitHub** with feature branches and pull requests to review and merge code.
- Each member worked on different modules — frontend, backend, and scheduling API.
- The README and documentation were written collaboratively, with assigned sections to avoid conflicts.
- We communicated per week to coordinate work and resolve merge conflicts efficiently.
- This workflow helped maintain code quality and project transparency.

---

##  My Role

I contributed primarily to:

- Developing frontend components using React and Inertia.js  
- Integrating the timetable generation Python API  
- Creating the admin panel for easy management
- implementing email sending to users via SMTP
- Collaborating closely with backend and scheduling team members
- Simplifying the assignment of class teachers and subject teachers

---

##  Setup Instructions

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

### Timetable Generator API (Python)
cd timetable-api
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn api:app 8001--reload
visit "/generate-timetable"


