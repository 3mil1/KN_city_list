# City List

## Getting started

### Setup

```bash
cd be
cp .env.sample .env # change values after copying
npm i
```

### Use

```bash
docker compose up # starting database
npm run start:dev # starting back-end
```

### API documentation

#### CityController

##### GET /cities

###### Description

Get a paginated list of cities, optionally filtered by a search term.

###### Query Parameters

- `page` (optional, default: `1`) - The page number to fetch.
- `limit` (optional, default: `10`) - The number of cities to fetch per page. Maximum limit is `100`.
- `search` (optional) - A search term to filter cities by their name.

###### Response

A `Pagination<CityEntity>` object containing the paginated list of cities.

##### POST /cities/upload

###### Description

Upload a CSV file containing city data and insert the cities into the database. The CSV file should have columns 'id', 'name', and 'photo'.

###### Request Body

- `file` - The CSV file to upload.

###### Response

A JSON object with a message indicating the number of cities successfully inserted.

Example:

```json
{
  "message": "Cities uploaded successfully. 100 cities were inserted."
}

### Technologies used

- Node.js, TypeScript, NestJS, TypeORM
