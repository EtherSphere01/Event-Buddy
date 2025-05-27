# Event Buddy

**For Installation:**

- **Backend**: See [Backend README](https://github.com/EtherSphere01/Event-Buddy/tree/main/event-buddy-server#readme) or the `event-buddy-server/README.md` file.
- **Frontend**: See [Frontend README](https://github.com/EtherSphere01/Event-Buddy/tree/main/event-buddy-client#readme) or the `event-buddy-client/README.md` file.

## Technology Stack

### Versions

- **Node.js**: 23.9.0
- **NestJS**: 11.0.7
- **Next.js**: 15.1.8
- **Tailwind CSS**: 4.0

### Dependencies

- **Backend**:
  - NestJS (`@nestjs/*` packages)
  - TypeORM for database management
  - PostgreSQL (`pg`) as the database
  - JWT for authentication (`@nestjs/jwt`, `passport-jwt`)
  - Multer for file uploads
  - Other dependencies: `bcrypt`, `class-validator`, `class-transformer`, `dotenv`
- **Frontend**:
  - Next.js for server-side rendering and client-side functionality
  - Axios for API requests
  - Tailwind CSS for styling
  - React libraries: `react`, `react-dom`, `react-toastify`, `sweetalert2`
  - Date handling: `date-fns`
  - JWT decoding: `jwt-decode`
  - Other dependencies: `lucide-react`, `multer`

## Prerequisites

- **Node.js**: Version 23.9.0 or compatible.
- **PostgreSQL**: Installed with pgAdmin for database management.
- **Postman**: For testing backend APIs.
- **Git**: To clone the repository.
- **Ports**:
  - Backend must run on `http://localhost:3000`.
  - Frontend must run on `http://localhost:3001`.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/EtherSphere01/Event-Buddy.git
   ```
2. Follow the setup instructions in the respective `README.md` files for backend and frontend:
   - **Backend**: See [Backend README](#backend-setup) or the `event-buddy-server/README.md` file.
   - **Frontend**: See [Frontend README](#frontend-setup) or the `event-buddy-client/README.md` file.
3. Import the database:
   - Create a PostgreSQL database named `event_buddy`.
   - Import the `event_buddy.sql` file from the `Database` folder using pgAdmin.
4. Import the API collection:
   - Open Postman and import the `Event Buddy.postman_collection.json` file to test APIs.

## Database and API Files

- **Database**: The `event_buddy.sql` file in the `Database` folder contains all necessary tables and initial data. Import it into the `event_buddy` database before running the project.
- **API Collection**: The `Event Buddy.postman_collection.json` file includes all backend API endpoints for testing. Import it into Postman to interact with the backend.

## ER Diagram

_(Insert ER Diagram image or description here. Update with the actual image file or link, e.g., `![ER Diagram](path/to/er-diagram.png)`)_

## Notes

- Ensure the backend runs on `http://localhost:3000` and the frontend on `http://localhost:3001` to avoid port conflicts.
- The backend uses JWT authentication. Use the `Sign In` API to obtain a `Bearer Token` for protected endpoints (see Postman configuration in the backend README).
- Test credentials:
  - **User**: `email: user@gmail.com`, `password: User@123`
  - **Admin**: `email: admin@gmail.com`, `password: Admin@123`
