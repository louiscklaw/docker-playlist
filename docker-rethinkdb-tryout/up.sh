#!/usr/bin/env bash

docker compose pull
docker compose build
docker compose kill
docker compose down
docker compose up -d
