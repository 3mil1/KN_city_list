# City List

### Technologies used

- Node.js, TypeScript, NestJS, TypeORM

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

### Get Cities

**Endpoint**: `GET /api/cities`

###### Description:

Get a paginated list of cities, optionally filtered by a search term.

###### Query Parameters

| Parameter | Type   | Default | Description                                                     |
|-----------|--------|---------|-----------------------------------------------------------------|
| page      | number | 1       | The page number to fetch.                                       |
| limit     | number | 10      | The number of cities to fetch per page. Maximum limit is `100`. |
| search    | string | -       | A search term to filter cities by their name.                   |

###### Response

A `Pagination<CityEntity>` object containing the paginated list of cities.

### Seed Cities

**Endpoint**: `POST api/cities/upload`

###### Description:

Upload a CSV file containing city data and insert the cities into the database. The CSV file should
have columns 'id', '
name', and 'photo'.

###### Request Body

| Field | Type | Description             |
|-------|------|-------------------------|
| file  | file | The CSV file to upload. |

###### Response

A JSON object with a message indicating the number of cities successfully inserted.

Example:

```json
{
  "message": "Cities uploaded successfully. 100 cities were inserted."
}
```

### Update City

**Endpoint**: `PUT /api/cities`

###### Description:

Updates the details of an existing city using the provided ID, name, and photo.

###### Request Body

| Field | Type   | Description                     |
|-------|--------|---------------------------------|
| id    | number | The ID of the city to update.   |
| name  | string | The new name for the city.      |
| photo | string | The new photo URL for the city. |

Example:

```json
{
  "id": "2",
  "name": "New City Name",
  "photo": "new_photo_url.jpg"
}
```

###### Response:

HTTP Status: 200 OK

```json
{
  "id": "2",
  "name": "New City Name",
  "photo": "new_photo_url.jpg"
}
```