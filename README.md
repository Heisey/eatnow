
# Fullstack project for a online food ordering app

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.18+)
- [npm](https://www.npmjs.com/)

## Server

1. **Go to directory:**

```sh
cd server
```

2. **Install dependencies:**

```sh
npm i
```

3. **Set environment variables:**

in the root on server directory enter

```sh
touch .env
```

4. **Set up a Auth0 proejct:**

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



for local db run 
sudo mongod --dbpath=/Users/justinheisler/data/db