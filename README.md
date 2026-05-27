**#College Event Management Application**
  A full‑stack web application built with Angular (frontend) and Node.js/Express (backend) to manage college events, creation, and student registrations.
  This project demonstrates clean architecture, secure authentication, and role‑based access control.

##**🚀 Features**
  Frontend (Angular)
  Responsive UI with Angular components for dashboards (Admin, Host, Student).
  Routing & Guards for authentication and role‑based access.
  Interceptors for attaching JWT tokens to API requests.
  Modular services for events, registration, and authentication.
  Backend (Node.js + Express)
  RESTful APIs for authentication, event management, and registration.
  PgSQL connection via Pg.Pool (configured in config/db.js).
  Middleware for JWT authentication and role authorization.
  Controllers for clean separation of business logic.
  
##**📂 Project Structure**
  event-management/ │ ├── src/ # Angular frontend │ ├── app/ # Components, services, guards, interceptors │ ├── index.html │ └── main.ts │ ├── event-backend/ # Node.js backend │ ├── config/db.js # Database connection │ ├── controllers/ # Auth, Event, Registration controllers │ ├── middleware/ # Auth & Role middleware │ ├── server.js # Express server entry point │ ├── package.json │ └── .env (ignored) # Environment variables │ ├── angular.json # Angular project config ├── package.json # Frontend dependencies ├── proxy.conf.json # API proxy for Angular dev server ├── tsconfig.json # TypeScript config └── .gitignore # Ignored files (node_modules, .env, etc.)

##**⚙️ Installation**
  1. Clone the repository
  git clone https://github.com/USERNAME/event-management.git
  cd event-management

### 2. Install dependencies
  npm install 
  cd event-backend/npm install (for backend)


## Running the application
  cd event-backend
  npm start

  ng serve
