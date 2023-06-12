#!/usr/bin/env bash

set -ex

FILE=/mnt/sda/not_mounted
if [ -f "$FILE" ]; then
    echo "$FILE exists."
  else 
    echo "$FILE does not exist."
fi

