# Outlook Contact Enrichment Add-in

## Overview

This project provides an Outlook add-in that enhances email messages by displaying additional contact information for senders. The solution consists of:

- A frontend add-in interface
- A backend API service with authentication
- A MySQL database for storing user and contact information

All components are containerized using Docker for easy deployment.

## Features

- Secure JWT authentication
- Contact information enrichment (name, department, phone, job title)
- Outlook integration (simulated in browser for development)
- Containerized architecture

## Prerequisites

- Docker Desktop installed
- Docker Compose (usually included with Docker Desktop)
- Node.js (for development purposes)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/outlook-contact-enrichment.git
cd outlook-contact-enrichment
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
# Database
DB_ROOT_PASSWORD=rootpassword
DB_USER=appuser
DB_PASSWORD=apppassword
DB_NAME=contact_enrichment
DB_PORT=3306

# JWT
JWT_SECRET=your_jwt_secret_key
```

### 3. Build and run the containers

```bash
docker-compose up --build
```

This will start:
- MySQL database on port 3306
- Node.js API on port 3000
- Nginx frontend on port 8080

## Accessing the Application

1. **Frontend**: Open `http://localhost:8080` in your browser
2. **API**: Access endpoints at `http://localhost:3000/api`

## Default Credentials

- Email: `user@example.com`
- Password: `password`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Contacts
- `GET /api/contacts/{email}` - Get contact details (requires authentication)

## Project Structure

```
outlook-contact-enrichment/
├── add-in/              # Frontend code
│   ├── src/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── app.js
│   └── manifest.xml
├── api/                 # Backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
├── db/                  # Database setup
│   ├── init.sql
│   └── Dockerfile
├── docker-compose.yml   # Container orchestration
└── .env                 # Environment configuration
```

## Development Workflow

### Rebuilding containers

```bash
docker-compose down && docker-compose up --build
```

### Viewing logs

```bash
# API logs
docker logs outlook-contact-enrichment-api-1

# Database logs
docker logs outlook-contact-enrichment-db-1

# Frontend logs
docker logs outlook-contact-enrichment-ui-1
```

### Accessing the database

```bash
docker exec -it outlook-contact-enrichment-db-1 mysql -uappuser -papppassword contact_enrichment
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3306, and 8080 are available
2. **Database initialization**: Check `docker logs outlook-contact-enrichment-db-1` for errors
3. **Authentication failures**: Verify `.env` matches database credentials
4. **CORS errors**: Ensure frontend is accessing the correct API URL

### Resetting the environment

```bash
docker-compose down -v
docker volume prune
docker system prune
docker-compose up --build
```

## License

This project is licensed under the MIT License.
