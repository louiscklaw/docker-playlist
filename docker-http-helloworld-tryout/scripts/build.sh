#!/usr/bin/env bash

set -ex



docker pull strm/helloworld-http

docker run \
  --rm \
  -it \
  -p 80:80 \
  --name helloworld_port_80 \
  strm/helloworld-http


