Here's a step-by-step guide and README template for setting up, running, and testing the API for the `Challenge1` from the repository you mentioned:

---

# Toppan Challenge 1: University API

This repository contains an API for managing university records. The API allows you to create, read, update, delete, bookmark, and unbookmark university records.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/tryhardlaijun/ToppanChallenge.git
cd ToppanChallenge/Challenge1
```

### Running the Application

The application is Dockerized, so you can easily spin it up using Docker Compose.

```bash
docker-compose up -d
```

- This command will build and start the application in detached mode.
- The API will be accessible on `http://localhost:3000`.

### Testing the API

You can test the API using `curl`, Postman, or any other HTTP client. Below are some example API calls.

### API Endpoints

1. **Get All Universities (with optional filtering)**

   - **Endpoint**: `GET /university`
   - **Query Parameters**:
     - `name` (optional): Filter by university name (case-insensitive).
     - `country` (optional): Filter by country (case-insensitive).
     - `isBookmark` (optional): Filter by bookmark status (`true` or `false`).
     - `showAll` (optional): Set to `true` to show all universities, including inactive ones.

   - **Example**:
     ```bash
     curl -X GET "http://localhost:3000/university?name=Example&country=USA&isBookmark=true"
     ```

2. **Get University by ID**

   - **Endpoint**: `GET /university/:id`
   - **Example**:
     ```bash
     curl -X GET "http://localhost:3000/university/1"
     ```

3. **Create a University**

   - **Endpoint**: `POST /university`
   - **Body Parameters**:
     - `name` (string): Name of the university.
     - `country` (string): Country of the university.
     - `webpages` (array of strings): List of university webpages.
     - `isBookmark` (boolean, optional): Bookmark status.

   - **Example**:
     ```bash
     curl -X POST "http://localhost:3000/university" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Example University",
       "country": "USA",
       "webpages": ["http://example.com"],
       "isBookmark": false
     }'
     ```

4. **Update a University**

   - **Endpoint**: `PUT /university/:id`
   - **Body Parameters**: Same as create.
   - **Example**:
     ```bash
     curl -X PUT "http://localhost:3000/university/1" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Updated University",
       "country": "Canada",
       "webpages": ["http://updated.com"],
       "isBookmark": true
     }'
     ```

5. **Delete a University**

   - **Endpoint**: `DELETE /university/:id`
   - **Example**:
     ```bash
     curl -X DELETE "http://localhost:3000/university/1"
     ```

6. **Bookmark a University**

   - **Endpoint**: `POST /university/bookmark/:id`
   - **Example**:
     ```bash
     curl -X POST "http://localhost:3000/university/bookmark/1"
     ```

7. **Unbookmark a University**

   - **Endpoint**: `POST /university/unbookmark/:id`
   - **Example**:
     ```bash
     curl -X POST "http://localhost:3000/university/unbookmark/1"
     ```

### Stopping the Application

To stop the application, run:

```bash
docker-compose down
```
