#!/usr/bin/env bash

set -ex


FILE=/mnt/sdb1/teedy/usb-store

if [ -f "$FILE" ]; then
  echo "$FILE exists."

  docker compose kill
  docker compose rm -v -f
  docker compose up -d
  docker compose logs -f

else
    echo "$FILE does not exist."
fi

