# FastGraph-generator

This project is a data generator for graph databases. It allows to generate Cypher queries to create a graph according to the parameters specify by the user.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.


## Prerequisites

### Node.js and Tools

- Get [Node.js][node].
- Install the tool dependencies: `npm install`

## Clone the repo

```shell
git clone https://github.com/meganewintz/FastGraph-generator
cd FastGraph-generator
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

## Run the application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Workings of the Application

- The application filesystem layout structure is based on the [angular-seed][angular-seed] project.
- There is no dynamic backend (no application server) for this application.

## Display the graph generated

FastGraph-generator using Cypher Query, a language developed by Neo4j. To show the graph generated, it is suggest to use Neo4j.


## Application Directory Layout

```
app/                        --> all the source code of the app
  data-parameters-form/...  --> files for the 'form page' component (the only one page currently)
  app.config.js             --> app-wide configuration of Angular services
  app.component.css         --> default stylesheet
  app.component.html        --> default html
  app.component.spec.ts     -->
  app.component.ts          --> the main app component
  app.module.js             --> the main app module
  data_parameters_model.ts  --> class 'DataParameter' to represent all the parameters available

```

