## Description

Product API built with the [Nest](https://github.com/nestjs/nest) framework.

## Running the database

Run [Postgres](https://www.postgresql.org/) locally, needs [Docker](https://docs.docker.com/engine/install) installed on the computer.

```bash
$ docker-compose up
```

## Installation

Installation of npm packages.

```bash
$ npm install
```

## Running the app

Run application in development.

```bash
# development
$ npm run start:nestjs

# watch mode
$ npm run start:dev
```

Run application in production.

```bash
# build app
$ npm run build

# production mode
$ npm run start
```

## Test

Run unit tests with coverage.

```bash
$ npm run test:cov
```

## Documentation

Documentation created with [Swagger](https://swagger.io), if running locally [click here](http://localhost:3000/docs) or access the path "/docs" when running the application.
