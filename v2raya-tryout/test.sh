#!/usr/bin/env bash

set -ex

# docker run -d \
#   --restart=always \
#   --privileged \
#   -p 2017:2017 \
#   -p 20173:20173 \
#   -p 20172:20172 \
#   -e V2RAYA_LOG_FILE=/tmp/v2raya.log \
#   -v ./volumes/lib/modules:/lib/modules:ro \
#   -v ./volumes/etc/resolv.conf:/etc/resolv.conf \
#   -v ./volumes/etc/v2raya:/etc/v2raya \
#   mzz2017/v2raya

docker compose up -d --build
