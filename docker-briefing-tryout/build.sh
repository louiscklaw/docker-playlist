#!/usr/bin/env bash

set -ex

docker compose kill
docker compose down

docker compose up -d --build

docker compose logs -f

sudo chown logic:logic -R data
sudo chmod 777 -R data
