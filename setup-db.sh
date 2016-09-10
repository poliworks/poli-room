docker rm pcs3623-postgresql
docker run --name pcs3623-postgresql -p 5432:5432 -e POSTGRES_USER=pcs3623 -e POSTGRES_PASSWORD=pcs3623 -e POSTGRES_DB=pcs3623 -d postgres
