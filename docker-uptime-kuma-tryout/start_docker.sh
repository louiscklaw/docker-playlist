#!/usr/bin/env bash

set -ex


docker compose -f ./docker-compose.yml kill
docker compose -f ./docker-compose.yml down
docker compose -f ./docker-compose.yml up -d --build
