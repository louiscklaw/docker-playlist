#!/usr/bin/env bash

set -ex

sudo chown logic:logic -R ..

docker compose kill
docker compose down

docker compose up -d
docker compose logs -f
