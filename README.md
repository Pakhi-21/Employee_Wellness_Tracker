# Employee Wellness Tracker

## Project Overview

The **Employee Wellness Tracker** is a web-based application designed to monitor and analyze employee wellness trends through surveys. It allows employees to submit wellness surveys, while admins can generate reports and analyze overall well-being trends.

---

## Features

### 🔹 Admin Functionalities

- Manage employees (Create, Update, Delete)
- Create and manage wellness surveys
- View and analyze survey responses
- Generate Reports (department, location)
- Export reports as PDF

### 🔹 Employee Functionalities

- Update personal details (Name, Email, Password, Department, Location)
- Fill wellness surveys
- Edit and Delete past survey responses (within a time limit -24 hours)

---

## Tech Stack

- **Backend:** Spring Boot, Java 17, Spring Data JPA
- **Frontend:** HTML, CSS, JavaScript
- **Database:** PostgreSQL
- **Security:** BCrypt Password Encryption
- **Version Control:** GitHub

---

## Project Structure (4-Layer Architecture)

```bash
Employee Wellness Tracker
│── src/main/java/com/company/ewt/
│   ├── entity/        # Database entities (Employee, Survey, SurveyResponse)
│   ├── repository/    # Database access layer (JPA Repositories)
│   ├── service/       # Business logic (Survey, Employee, Report Services)
│   ├── controller/    # REST API Controllers
│── src/main/resources/
│   ├── application.properties  # Database & app settings
│── pom.xml          # Dependencies (Maven)
```

---

## Installation & Setup

### - Clone the repository

```bash
git clone https://github.com/Pakhi-21/Employee_Wellness_Tracker.git
```

### - Configure the database

Update `application.properties` in `src/main/resources/`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ewt_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
```

### - Run the application

```bash
mvn spring-boot:run
```

### - Access API Endpoints:

- **Employee Management:** `http://localhost:8080/api/admin/employees`
- **Survey Management:** `http://localhost:8080/api/admin/surveys`
- **Reports & Analytics:** `http://localhost:8080/api/reports`

---

## Future Enhancements

- Add email notifications for survey reminders
- Enhance dashboard with interactive charts
- Add JWT authentication

---


