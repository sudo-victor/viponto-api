# API VIPonto

This API is designed to provide time tracking functionalities. Built using modern technologies such as Vitest, TypeScript, and following best practices like DDD (Domain-Driven Design) and SOLID principles, this API ensures robustness and scalability. Unit tests are also included to ensure the reliability of the application.

## Features

### Functional Requirements:

1. **Register a User**
   - **RF01** - Allow the registration of a new user in the application. The registration process should include details like name, email, password, and other necessary information.

2. **Authenticate a User**
   - **RF02** - Enable user authentication in the application using provided credentials such as username and password.

3. **Register a Company**
   - **RF03** - Allow the registration of a new company on the platform. Creating a company should include details like name, address, contact information, and other relevant details.

4. **Register Company Employees**
   - **RF04** - Enable the company to register associated employees. This should include details like name, email, role, and other specifics.

5. **Authenticate a Company**
   - **RF05** - Enable company authentication in the application using the company's credentials like username and password.

6. **Create a Workspace**
   - **RF06** - Provide functionality to create a workspace within the company. It should be possible to provide details like name, description, and specific workspace settings.

7. **Log Entry/Exit Times in Workspace**
   - **RF07** - Allow the logging of entry and exit times of employees in the workspace. This includes logging the start and end work hours.

8. **Search Entry/Exit Time Records for a Day**
   - **RF08** - Enable the search of all entry/exit time records for a specific day. Users should be able to select the desired date to view the logs.

9. **List Entry/Exit Time Records by Day with Pagination**
   - **RF09** - Display entry/exit time records by day with support for pagination of 5 days. This allows users to easily view records from multiple days.
