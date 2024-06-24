
# Fullstack project for a online food ordering app

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.18+)
- [npm](https://www.npmjs.com/)

## Database
if running the database locally run make sure mongo is running

## Server
Start a new terminal from project root

1. **Go to directory:**

```sh
cd server
```

2. **Install dependencies:**

```sh
npm install
```

3. **Set environment variables:**

in the root on server directory enter

```sh
touch .env
```

4. **Set up a Auth0 project:**

variables to be set:
AUTH_AUDIENCE
AUTH_ISSUER_BASE_URL
AUTH_TOKEN_SIGNING_ALG

5. **Set project variables:**

variables to be set:
SERVER_PORT
DB_CONNECTION_STRING

6. **Start project:**

run start command

```sh
npm start
```

## Client

1. **Go to directory:**
Start a new terminal from project root

```sh
cd client
```

2. **Install dependencies:**

```sh
npm install
```

4. **Set up a Auth0 project:**

variables to be set:
VITE_AUTH_DOMAIN,
VITE_CLIENT_ID,
VITE_REDIRECT_URI,
VITE_AUTH_AUDIENCE

5. **Set up AWS Bucket:**

variables to be set:
VITE_AWS_REGION,
VITE_AWS_KEY_ID,
VITE_AWS_SECRET_KEY,
VITE_AWS_BUCKET

6. **Set project variables:**

variables to be set:
VITE_SERVER_URL

6. **Start project:**

run start command

```sh
npm dev
```
