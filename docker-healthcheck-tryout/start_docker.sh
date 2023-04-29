#!/usr/bin/env bash

set -ex

# sudo rm -rf data

docker compose build
docker compose kill
docker compose up -d
docker compose logs -f