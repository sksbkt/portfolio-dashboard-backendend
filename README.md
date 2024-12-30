# Server

This is the backend server for the personal portfolio project. It is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/personal_portfolio.git
    cd personal_portfolio/server
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `server` directory and add the following variables:

    ```env
    CONNECTION_STRING=your_mongodb_connection_string
    PORT=your_port_number
    JWT_SECRET=your_jwt_secret
    TRANSPORTER_GMAIL_EMAIL=your_gmail_email
    TRANSPORTER_GMAIL_PASSWORD=your_gmail_password
    ```

## Usage

1. Start the server:

    ```sh
    npm run dev
    ```

2. The server will be running at `http://localhost:7002` (or the port you specified in the `.env` file).

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Users

- `GET /api/users/admin` - Access admin page (requires admin role)
- `GET /api/users/manager` - Access manager page (requires admin or manager role)
- `GET /api/users/user` - Access user page (requires admin, manager, or user role)

### Contact

- `POST /api/contact/email` - Send a contact email

## Environment Variables

- `CONNECTION_STRING` - MongoDB connection string
- `PORT` - Port number for the server
- `JWT_SECRET` - Secret key for JWT
- `TRANSPORTER_GMAIL_EMAIL` - Gmail email for sending emails
- `TRANSPORTER_GMAIL_PASSWORD` - Gmail password for sending emails

## License

This project is licensed under the MIT License.