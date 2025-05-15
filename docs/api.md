# InnerView API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### Portraits

#### Get All Portraits
```http
GET /portraits
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "created_at": "string",
      "text": "string",
      "image_url": "string",
      "reactions": {
        "isMe": 0,
        "isBeautiful": 0,
        "isTouching": 0
      }
    }
  ]
}
```

#### Create Portrait
```http
POST /portraits
Content-Type: application/json

{
  "text": "string",
  "image_url": "string"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "created_at": "string",
    "text": "string",
    "image_url": "string",
    "reactions": {
      "isMe": 0,
      "isBeautiful": 0,
      "isTouching": 0
    }
  }
}
```

#### Get Portrait by ID
```http
GET /portraits/{id}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "created_at": "string",
    "text": "string",
    "image_url": "string",
    "reactions": {
      "isMe": 0,
      "isBeautiful": 0,
      "isTouching": 0
    }
  }
}
```

#### Update Portrait Reactions
```http
PATCH /portraits/{id}
Content-Type: application/json

{
  "reactionType": "isMe" | "isBeautiful" | "isTouching"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "created_at": "string",
    "text": "string",
    "image_url": "string",
    "reactions": {
      "isMe": 0,
      "isBeautiful": 0,
      "isTouching": 0
    }
  }
}
```

#### Delete Portrait
```http
DELETE /portraits/{id}
```

Response:
```json
{
  "success": true,
  "message": "Portrait deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "path": "string",
      "message": "string"
    }
  ]
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Portrait not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Examples

### Create a new portrait
```bash
curl -X POST http://localhost:3000/api/portraits \
  -H "Content-Type: application/json" \
  -d '{"text":"Test portrait","image_url":"https://example.com/test.jpg"}'
```

### Get all portraits
```bash
curl http://localhost:3000/api/portraits
```

### Get a specific portrait
```bash
curl http://localhost:3000/api/portraits/{id}
```

### Update reactions
```bash
curl -X PATCH http://localhost:3000/api/portraits/{id} \
  -H "Content-Type: application/json" \
  -d '{"reactionType":"isBeautiful"}'
```

### Delete a portrait
```bash
curl -X DELETE http://localhost:3000/api/portraits/{id}
``` 