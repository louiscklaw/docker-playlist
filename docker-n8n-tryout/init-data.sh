#!/bin/bash

set -e;

if [ -n "${POSTGRES_NON_ROOT_USER:-}" ] && [ -n "${POSTGRES_NON_ROOT_PASSWORD:-}" ]; then
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
		CREATE USER 'hello' WITH PASSWORD 'world';
		GRANT ALL PRIVILEGES ON DATABASE 'n8n' TO 'hello';
	EOSQL
else
	echo "SETUP INFO: No Environment variables given!"
fi
