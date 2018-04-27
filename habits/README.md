# Habits Microservice

## API Documentation

[SwaggerHub Docs](https://app.swaggerhub.com/apis/jinigoe/habits)

## System Requirements

- Node +v8.1.2

## Steps to run the project

```shell
npm install
npm start
```

## MySQL DB structure

[Click here](config/db-structure.sql)

## Code Metrics

[Plato](https://github.com/es-analysis/plato)

```shell
npm install -g plato
plato -r -d plato-report ./src/
```

[Complexity-Report](https://github.com/escomplex/complexity-report)

```shell
npm install -g complexity-report
cr ./src/
```