# Images Tasks API

REST API that creates image processing tasks and generates resized versions of the provided image.

The service stores tasks in MongoDB and processes images asynchronously using Sharp.

---

## Tech Stack

* Node.js
* Express
* TypeScript
* MongoDB
* Sharp
* Jest + Supertest

---

## Features

* Create image processing tasks
* Store tasks in MongoDB
* Process images asynchronously
* Generate resized images (1024px and 800px)
* Retrieve task status and results
* Functional API tests

---

## Project Structure

```
src/
  core/           # Domain models and repository interfaces
  application/    # Use cases
  infra/          # MongoDB repository and image processor
  interfaces/     # Express controllers and routes
```

The project follows a simplified **Hexagonal Architecture**:

* **core** → domain logic
* **application** → use cases
* **infra** → database and image processing
* **interfaces** → HTTP layer

---

## Installation

```
npm install
```

---

## Run the server

```
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

## API Endpoints

### Create Task

```
POST /tasks
```

Request body:

```
{
  "imagePath": "./input/test.jpg"
}
```

Response:

```
{
  "taskId": "uuid",
  "status": "pending",
  "price": 27
}
```

---

### Get Task

```
GET /tasks/:id
```

Response example:

```
{
  "id": "uuid",
  "status": "completed",
  "price": 27,
  "images": [
    {
      "resolution": 1024,
      "path": "output/..."
    },
    {
      "resolution": 800,
      "path": "output/..."
    }
  ]
}
```

---

## Running Tests

```
npm test
```

Tests cover:

* task creation
* retrieving tasks
* validation errors
* not found tasks
* image processing flow

Image processing is disabled during tests to avoid filesystem side effects.

---

## Notes

Images are processed asynchronously using Sharp.
Generated images are stored in the `output` directory.
