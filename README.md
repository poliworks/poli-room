# Projeto PCS 3623

To run this application you need to have a Postgresql docker container running with the default 5432 port binded to the localhost (Or a localhost instance).
To stat the database env just run ./setup-db.sh (be sure to have docker installed). It will download the Database container and start it with the right params.
Everytime you run setup-db.sh it will wipe any existing instance of the container, building a new clean database.

Also be sure to have installed Java 8 and Scala (with sbt).

More instructions to come...
