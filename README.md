# City List Application

This is an enterprise-grade "City List" application built using NestJS. The application allows users to perform the
following actions:

- Browse through a paginated list of cities with corresponding photos.
- Search cities by name.
- Edit city details, including the name and photo.

## Features

- The initial list of cities is populated using the provided `cities.csv` file.

## Technical Stack

- Backend: NestJS
- Database: PostgreSQL
- Frontend : React

## Contributors

This project was created by the following team members:

- [Emil Värnomasing](https://github.com/3mil1) - Backend && Frontend Development
- [Kadri Kajaste](https://github.com/kkajaste) - Frontend Development

### Setup

Change values in .env after copying:

```bash
cp be/.env.sample be/.env
docker compose --env-file ./be/.env up
```

## Missing Features in this Project

This project is a great starting point for a city list application. However, there are some essential features that are
not yet implemented. These missing features include:

1) **Refresh JWT token**: The current implementation only provides an access token when a user logs in. To improve
   security and
   user experience, the application should implement refresh tokens. This allows users to obtain new access tokens
   without
   having to re-enter their credentials, while also enabling token revocation and better control over session
   management.
2) **Unit Tests** are essential for ensuring code quality and preventing regressions. We recognize the importance of
   testing and have already taken steps to create unit tests for our application's authentication feature. Specifically,
   we have tested the auth controller and service by implementing tests for the login endpoint. These tests cover
   scenarios with valid credentials, invalid credentials, and missing credentials, which help ensure the endpoint
   functions as expected. However, there are still many other areas of the application that need testing. For instance,
   we should create tests for
   all modules and components to verify their behavior and catch any potential issues or bugs. Writing comprehensive
   tests
   can be time-consuming, but it is crucial for maintaining the quality and stability of our application. Therefore, we
   will continue to prioritize testing as part of our development process.

3) **Integration tests**: In addition to unit tests, integration tests would help verify that the different components
   of the application work together as expected. These tests would simulate real-world usage scenarios and help identify
   issues that may not be detected by unit tests alone.

4) **End-to-end (E2E) tests** : End-to-end tests would simulate the complete user experience by testing the application
   from the front-end to the back-end. These tests would help confirm that all aspects of the application, including the
   user interface, API endpoints, and database interactions, are functioning correctly.

By addressing these missing features, the project will be more robust, secure, and maintainable.
