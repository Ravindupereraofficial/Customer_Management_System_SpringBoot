# Customer Management System

## Overview
The **Customer Management System** is a Spring Boot application designed to manage customer records efficiently. It provides a RESTful API for performing CRUD (Create, Read, Update, Delete) operations on customer data.

## Features
- Add, update, and delete customer records
- Retrieve customer details
- Search customers by name or ID
- RESTful API with JSON responses
- Secure authentication and authorization
- MySQL database integration

## Technologies Used
- **Spring Boot** - Backend framework
- **Spring Data JPA** - ORM for database interactions
- **MySQL** - Relational database
- **Swagger** - API documentation
- **Lombok** - Simplifies Java code

## Installation
### Prerequisites
- Java 17+
- MySQL database
- Maven

### Steps to Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Ravindupereraofficial/Customer_Management_System_SpringBoot.git
   cd Customer_Management_System_SpringBoot
   ```
2. Configure database settings in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/customer_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
3. Run the application:
   ```sh
   mvn spring-boot:run
   ```

## API Endpoints
### Customer Endpoints
- **GET**- Retrieve all customers
- **GET**  - Retrieve a specific customer
- **POST**  - Add a new customer
- **PUT** - Update customer details
- **DELETE**  - Delete a customer

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any issues or contributions, feel free to create an issue on the repository or contact the author.

