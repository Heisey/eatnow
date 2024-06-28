# Server Setup and Start

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.18+)


## Database
if running the database locally make sure mongo is running

## Server
Start a new terminal from project root

1. **Go to directory:**

```sh
cd server
```

2. **Set environment variables:**

in the root on server directory enter

```sh
touch .env
```

3. **Set project variables:**

variables to be set:
SERVER_PORT
DB_CONNECTION_STRING


4. **Set up a firebase key:**

variables to be set:
FIREBASE_TYPE
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_CLIENT_ID
FIREBASE_AUTH_URI
FIREBASE_TOKEN_URI
FIREBASE_AUTH_CERT
FIREBASE_CLIENT_CERT
FIREBASE_DOMAIN

5. **Install dependencies:**

```sh
npm install
```

6. **Start project:**

run start command

```sh
npm start
```
