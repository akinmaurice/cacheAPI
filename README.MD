# cacheAPI

Simple Node JS Cache Api

Getting Started

Please ensure you have Node Js installed.

```
  1.  git clone https://github.com/akinmaurice/thanos-check.git
  2.  cd thanos-check
  3.  Provide the MongoDB connection string: Example:

    export DATABASE_DEV_URL=mongodb://127.0.0.1:27017/cache

  4.  Run npm install
  5.  Run npm start
  6.  visit http://localhost:3023/v1 to access the api
```


## Dependencies
```
  1. MONGODB
  2. NodeJS
  3. ExpressJS
```

## API Endpoints

All API endpoints return a status code of 200 for successful calls and 400 including an error object for unsuccessful calls.

```
| EndPoint                                |   Functionality                      |
| --------------------------------------- | ------------------------------------:|
| GET /v1/keys                            | Get All Keys                         |
| GET /v1/keys/:key_name                  | Get Single Key                       |
| POST /v1/keys/:key_name                 | Create Key Data                      |
| PUT /v1/keys/:key_name/:data_id         | Update Key Data                      |
| DELETE /v1/keys                         | Delete All Keys                      |
| DELETE /v1/keys/:key_name               | Delete Single Keys                   |
```
