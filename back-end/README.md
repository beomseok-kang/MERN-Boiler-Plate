# MERN Boiler Plate Back End

## Stack

- express
- jsonwebtoken
- mongoose
- ... and other libraries.

## Configurations

For security issue, config/dev.js file and .env file are excluded from git. The excluded files and folders can be found on `../.gitignore` file.

#### config/dev.js

config/dev.js file contains the following information.

- mongoURI
- dbName
- tokenIssuer

and the sample code is as below:

```javascript
const { MONGO_ID, MONGO_PW } = process.env;
const dbName = 'development';

const mongoURI = `mongodb+srv://${MONGO_ID}:${MONGO_PW}@` + 
  `localhost:10101/${dbName}` +
  '?retryWrites=true&w=majority';

const tokenIssuer = 'effort';

module.exports = {
  mongoURI,
  dbName,
  tokenIssuer
};
```

#### .env

.env file contains the following information.

- MONGO_ID
- MONGO_PW
- JWT_SECRET

Node module, dotenv is used to use .env file.

## Routes

`userRouter` uses `/api/user` routes, and it contains below functions.

- `POST /register` : requests register by putting `{ nickName, email, password }` on the request body. Success returns json with code 200.
- `POST /login` : requests json web token by putting `{ email, password }` on the request body. Success returns json including token and userdata with code 200.
- `GET /data` : reqeusts decoding the token by putting token on the authorization section of the request header. Success returns json with decoded token's payload.

## Status Codes

### 200 ~ 299

- 200: Successful, No Error.
- 201: Register Successful.

### 400 ~ 499

- 400: General Error.
- 401: Invalid Token.
- 419: Token Expired.
- 420: Signin - incorrect password.
- 421: Signin - user does not exist.
- 422: Register - user already exists.