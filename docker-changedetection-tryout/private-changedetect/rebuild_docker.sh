#!/usr/bin/env bash


pushd private-changedetect
  docker compose kill
  docker compose down
  docker compose up -d --build

  docker compose logs -f
  # docker compose ps -a
popd


