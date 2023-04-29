#!/usr/bin/env bash

set -ex

docker compose kill
docker compose down

docker compose build
docker compose up -d

docker compose logs -f
