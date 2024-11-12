#!/usr/bin/env bash

set -ex

docker run --name=gogs \
    -p 10022:22 \
    -p 10880:3000 \
    -v ./volumes:/data gogs/gogs