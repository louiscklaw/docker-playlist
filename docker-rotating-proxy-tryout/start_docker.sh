#!/usr/bin/env bash

set -ex

# sudo rm -rf data

docker compose pull
docker compose build

docker compose down
docker compose kill

docker compose up -d

docker compose logs -f
