# AlgoSuite APIs

## Overview

AlgoSuite is a comprehensive API collection that provides powerful algorithmic and utility functionalities. The suite includes:
- Authentication services
- String manipulation operations
- Tree data structure operations
- User management capabilities

## Installation

```bash
# Clone the repository
git clone https://github.com/kraghavan7199/algosuiteapi.git

# Navigate to project directory
cd algosuiteapi

# Install dependencies
npm install

# Set up environment variables
PORT=3000
DATABASE_URL=your_database_url
# Edit .env file with your configurations

# Set up database
# Download the migrations.sql file from /migrations/migrations.sql

# Run the SQL migrations file against your PostgreSQL database
psql -U your_username -d your_database_name -f path/to/migrations.sql
# Or import using your preferred PostgreSQL client

# Start development server
npm run dev

# For production
npm run build
npm start
```

## Authentication

Authentication is required for accessing most endpoints:
- Public endpoints: Registration and Login
- Protected endpoints: All other operations require a valid `auth-key` in the request header

## API Access

### Live Demo
Access the live API demo at:
```
https://algosuiteapi-4d29b5a3bdf5.herokuapp.com
```

### Documentation
Comprehensive API documentation is available at [AlgoSuite API Docs](https://kraghavan7199.github.io/algosuiteapidoc/#/)

## Technical Stack

### Core Technologies
- **Node.js & TypeScript** 
  -Provides type safety and enhanced development experience
  - Ensures maintainable and scalable codebase

- **PostgreSQL Database**
  - Optimized for complex queries
  - Efficient storage and retrieval of structured data

### Architecture & Design
- **Onion Architecture**
  - Organized in distinct layers:
    - Domain Layer
    - Application Layer
    - Infrastructure Layer
  - Ensures clear separation of concerns

### Key Components
- **Inversify**
  - Implements dependency injection
  - Adheres to SOLID principles

- **JWT Authentication**
  - Secure token-based authentication
  - Stateless authentication flow
  - Protected endpoint access control