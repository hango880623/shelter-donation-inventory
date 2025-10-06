# Digital Aid - Shelter Donation Inventory

A full-stack web application for managing shelter donation inventory, built with Node.js, TypeScript, and React.

## Features

- **Donation Input Form**: Form for recording donations with donor name, type, quantity/amount, and date
- **Donation List**: View all recorded donations with edit and delete capabilities
- **REST API**: CRUD operations for donation management
- **Data Persistence**: All donation data is stored in the backend

## Technology Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Frontend**: React, TypeScript, Vite
- **Development**: Concurrently for running both servers

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Install all dependencies for root, server, and client:
```bash
npm run install:all
```

### Development

Run both server and client in development mode:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend client on http://localhost:5173

### Building for Production

Build both server and client:
```bash
npm run build
```

### Production

Start the production server:
```bash
npm start
```

## Project Structure

```
digital-aid/
├── server/          # Backend Node.js/TypeScript API
├── client/          # Frontend React/TypeScript app
├── package.json     # Root package.json for scripts
└── README.md
```

## API Endpoints

- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create a new donation
- `PUT /api/donations/:id` - Update a donation
- `DELETE /api/donations/:id` - Delete a donation

## Data Model

Each donation contains:
- `id`: Unique identifier
- `donorName`: Name of the donor
- `donationType`: Type of donation (money, food, clothing, etc.)
- `quantity`: Quantity or amount donated
- `date`: Date of the donation
- `createdAt`: Timestamp when record was created
- `updatedAt`: Timestamp when record was last updated