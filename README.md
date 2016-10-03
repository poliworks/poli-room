# POLI Room - Projeto PCS 3623

## Requirements

To run and develop this application is necessary to have installed the following dependencies (please check on their respective guides how to install they):

- Docker
- Java 8 JDK
- Scala 11.8
- SBT
- Activator

## Running

This application comes bundled with a helper cli for database setup and management.
You can use the following commands to manage you database environment.

- `./dbcli setup` -> will create a new fresh database container for the application (wipe any existing container)

- `./dbcli start` -> start a stopped database

- `./dbcli stop` -> stop a running database

- `./dbcli delete` -> deletes an existing instance of the database
	

Every time you run `./dbcli setup` it will wipe any existing instance of the container, building a new clean database.

## Deploying

The deploy system relies on Docker orchestration, using docker-compose. There are some steps to be done in order to run the application in Production mode.

1. `./docker-build.sh` -> Compiles the application, assembly the binary distribution and then build a docker image using it
2.  `./docker-push.sh` -> pushes the generated docker image to Docker Hub
3. `docker-compose up` -> uses the docker-compose.yml file to start and connect the database container and the poli-room application container

The application will be running the `localhost:9000`

## Other

More instructions to come...
