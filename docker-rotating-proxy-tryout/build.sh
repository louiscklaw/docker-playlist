#!/usr/bin/env bash

set -ex

# build docker container
# docker build -t mattes/rotating-proxy:latest .

# ... or pull docker container
docker pull mattes/rotating-proxy:latest

# start docker container
docker run -d -p 5566:5566 -p 4444:4444 --env tors=25 mattes/rotating-proxy

# test with ...
# curl --proxy 127.0.0.1:5566 https://api.my-ip.io/ip

# monitor
# http://127.0.0.1:4444/haproxy?stats
