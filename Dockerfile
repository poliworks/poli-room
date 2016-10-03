FROM java:8

WORKDIR /app
ADD target/universal/poli-room-1.0-SNAPSHOT.zip /app
RUN unzip poli-room-1.0-SNAPSHOT.zip
RUN mv poli-room-1.0-SNAPSHOT/ poli-room/
RUN rm poli-room-1.0-SNAPSHOT.zip
EXPOSE 9000
CMD exec poli-room/bin/poli-room -Dconfig.resource=prod.conf
