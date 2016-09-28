# POLI Room - Projeto PCS 3623

## Requirements

To run and develop this application is necessary to have instaled the folowwing dependencies (please check on their respectives guides how to install they):

- Docker

- Java 8 JDK

- Scala 11.8

- SBT

## Runnning

This applicaiton comes bundled with a helper cli for database setup and management.
You can use the following commands to manage you database environment.

- `./dbcli setup` -> will create a new fresh database container for the application (wipe any existing container)

- `./dbcli start` -> start a stopped database

- `./dbcli stop` -> stop a running database

- `./dbcli delete` -> deletes an existing instance of the database
	

Everytime you run `dbcli setup` it will wipe any existing instance of the container, building a new clean database.

## Other

More instructions to come...
