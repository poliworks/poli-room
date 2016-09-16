if [[ $1 == "delete" ]]; then
	docker rm pcs3623-postgresql
elif [[ $1 == "start" ]]; then
	docker start pcs3623-postgresql
elif [[ $1 == "stop" ]]; then
	docker stop pcs3623-postgresql
elif [[ $1 == "setup" ]]; then
	docker rm pcs3623-postgresql
	docker run --name pcs3623-postgresql -p 5432:5432 -e POSTGRES_USER=pcs3623 -e POSTGRES_PASSWORD=pcs3623 -e POSTGRES_DB=pcs3623 -d postgres
else
	echo "Choose one of the following options:"
	echo "delete  -> Remove any existing instances of the database"
	echo "start  -> Start a existing instance of the database, or create one if none exists"
	echo "stop -> Stop a running instance of the database"
	echo "setup -> Wipe and create a new database"
fi
