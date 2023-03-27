# City List Application

This is an enterprise-grade "City List" application built using NestJS. The application allows users to perform the
following actions:

-   Browse through a paginated list of cities with corresponding photos.
-   Search cities by name.
-   Edit city details, including the name and photo.

## Features

-   The initial list of cities is populated using the provided `cities.csv` file.

## Technical Stack

-   Backend: NestJS
-   Database: PostgreSQL
-   Frontend : React

### Setup

Change values in .env after copying:

```bash
cp be/.env.sample be/.env
docker compose --env-file ./be/.env up
```

## Contributors

This project was created by the following team members:

-   [Emil Värnomasing](https://github.com/3mil1) - Backend && Frontend Development
-   [Kadri Kajaste](https://github.com/kkajaste) - Frontend Development

## Notes on teamwork

### Team setup

Team included two people, one frontend and one backend developer. Implementation was mostly done independently, discussing technical choices and frontend-backend touchpoints when needed.
Communication was done in chat or face-to-face in the office.

### Timeframe

FE ~75h
BE ~50h

### Benefits of teamwork

Main benefit is to be able to discuss project related problems, scope, architecture, technical choices, react quickly to bugs and cross-test. Help out when someone is stuck etc.
