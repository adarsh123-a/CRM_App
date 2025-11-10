# CRM API Documentation

This document provides detailed information about all available API endpoints, including required parameters, example requests, and expected responses.

## Authentication

All API requests require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Register a New User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "SALES_EXECUTIVE", // Optional: ADMIN, MANAGER, SALES_EXECUTIVE
  "companyId": 1 // Optional: Assign user to existing company
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "SALES_EXECUTIVE",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive access tokens

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "fLQoHnKzXvMqRtYwEjUpAsDgHcFbNxVz",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "SALES_EXECUTIVE"
  }
}
```

## Companies

### Create a Company

**Endpoint:** `POST /api/companies`

**Description:** Create a new company (Admin access required)

**Request Body:**

```json
{
  "name": "Acme Corporation",
  "size": 50 // Number of employees
}
```

**Response:**

```json
{
  "company": {
    "id": 1,
    "name": "Acme Corporation",
    "size": 50
  }
}
```

### Get All Companies

**Endpoint:** `GET /api/companies`

**Description:** Retrieve all companies with their associated users

**Response:**

```json
{
  "companies": [
    {
      "id": 1,
      "name": "Acme Corporation",
      "size": 50,
      "users": [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com",
          "role": "SALES_EXECUTIVE",
          "createdAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

### Get Company by ID

**Endpoint:** `GET /api/companies/:id`

**Description:** Retrieve a specific company by ID with its associated users

**Response:**

```json
{
  "company": {
    "id": 1,
    "name": "Acme Corporation",
    "size": 50,
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "SALES_EXECUTIVE",
        "createdAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Update Company

**Endpoint:** `PATCH /api/companies/:id`

**Description:** Update company information (Admin/Manager access required)

**Request Body:**

```json
{
  "name": "Acme Corporation Inc.", // Optional
  "size": 75 // Optional
}
```

**Response:**

```json
{
  "company": {
    "id": 1,
    "name": "Acme Corporation Inc.",
    "size": 75
  }
}
```

### Delete Company

**Endpoint:** `DELETE /api/companies/:id`

**Description:** Delete a company (Admin access required)

**Response:**

```json
{
  "message": "Company deleted successfully"
}
```

## Users

### Assign User to Company

**Endpoint:** `PATCH /api/users/assign`

**Description:** Assign a user to a company (Admin/Manager access required)

**Request Body:**

```json
{
  "userId": 1,
  "companyId": 1
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "SALES_EXECUTIVE",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "companyId": 1,
    "company": {
      "id": 1,
      "name": "Acme Corporation"
    }
  }
}
```

### Get Users by Company

**Endpoint:** `GET /api/users/company/:companyId`

**Description:** Get all users associated with a specific company

**Response:**

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "SALES_EXECUTIVE",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

## Leads

### Create a Lead

**Endpoint:** `POST /api/leads`

**Description:** Create a new lead. Leads can be assigned to any user belonging to the same company. Only Admins and Managers can assign leads to users other than themselves.

**Request Body:**

```json
{
  "title": "Important Client",
  "email": "client@example.com", // Optional
  "phone": "+1234567890", // Optional
  "customer": "ABC Corporation", // Optional: Customer name
  "contactPerson": "Jane Smith", // Optional: Contact person name
  "contactNumber": "+1987654321", // Optional: Contact person number
  "ownerId": 1 // Optional: Assign to specific user (defaults to current user)
}
```

**Response:**

```json
{
  "lead": {
    "id": 1,
    "title": "Important Client",
    "status": "NEW",
    "ownerId": 1,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "email": "client@example.com",
    "phone": "+1234567890",
    "customer": "ABC Corporation",
    "contactPerson": "Jane Smith",
    "contactNumber": "+1987654321"
  }
}
```

### Get All Leads

**Endpoint:** `GET /api/leads`

**Description:** Retrieve all leads (Sales Executives see only their leads, Admin/Manager see all)

**Response:**

```json
{
  "leads": [
    {
      "id": 1,
      "title": "Important Client",
      "status": "NEW",
      "ownerId": 1,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "email": "client@example.com",
      "phone": "+1234567890",
      "customer": "ABC Corporation",
      "contactPerson": "Jane Smith",
      "contactNumber": "+1987654321",
      "owner": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "SALES_EXECUTIVE",
        "company": {
          "id": 1,
          "name": "Acme Corporation"
        }
      },
      "leadHistories": []
    }
  ]
}
```

### Get Lead by ID

**Endpoint:** `GET /api/leads/:id`

**Description:** Retrieve a specific lead by ID with its history

**Response:**

```json
{
  "lead": {
    "id": 1,
    "title": "Important Client",
    "status": "NEW",
    "ownerId": 1,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "email": "client@example.com",
    "phone": "+1234567890",
    "customer": "ABC Corporation",
    "contactPerson": "Jane Smith",
    "contactNumber": "+1987654321",
    "owner": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "SALES_EXECUTIVE"
    },
    "leadHistories": [
      {
        "id": 1,
        "leadId": 1,
        "changedById": 1,
        "oldStatus": "NEW",
        "newStatus": "CONTACTED",
        "notes": "Initial contact made via email",
        "meetingDetails": "Discussed project requirements",
        "changedAt": "2023-01-02T00:00:00.000Z",
        "changedBy": {
          "id": 1,
          "name": "John Doe"
        }
      }
    ]
  }
}
```

### Update Lead

**Endpoint:** `PATCH /api/leads/:id`

**Description:** Update lead information and optionally add history entry. When status is updated, a history record is automatically created with notes and meeting details.

**Request Body:**

```json
{
  "title": "Very Important Client", // Optional
  "email": "client_updated@example.com", // Optional
  "phone": "+1987654321", // Optional
  "customer": "ABC Corporation Inc.", // Optional
  "contactPerson": "Jane Smith", // Optional
  "contactNumber": "+1122334455", // Optional
  "status": "CONTACTED", // Optional: Triggers history entry
  "notes": "Client responded positively", // Optional: Added to history entry when status changes
  "meetingDetails": "Discussed project requirements and timeline" // Optional: Added to history entry when status changes
}
```

**Response:**

```json
{
  "lead": {
    "id": 1,
    "title": "Very Important Client",
    "status": "CONTACTED",
    "ownerId": 1,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z",
    "email": "client_updated@example.com",
    "phone": "+1987654321",
    "customer": "ABC Corporation Inc.",
    "contactPerson": "Jane Smith",
    "contactNumber": "+1122334455",
    "leadHistories": [
      {
        "id": 1,
        "leadId": 1,
        "changedById": 1,
        "oldStatus": "NEW",
        "newStatus": "CONTACTED",
        "notes": "Client responded positively",
        "meetingDetails": "Discussed project requirements and timeline",
        "changedAt": "2023-01-02T00:00:00.000Z"
      }
    ]
  }
}
```

### Delete Lead

**Endpoint:** `DELETE /api/leads/:id`

**Description:** Delete a lead (Admin/Manager access required)

**Response:**

```json
{
  "msg": "Lead deleted successfully"
}
```

## Roles

The application has three user roles with different permissions:

1. **ADMIN** - Full access to all features
2. **MANAGER** - Can manage companies and users, view all leads
3. **SALES_EXECUTIVE** - Can manage their own leads and view company information

## Lead Statuses

Leads can have the following statuses:

- NEW
- CONTACTED
- QUALIFIED
- CLOSED
