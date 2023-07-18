#!/usr/bin/env bash

set -ex

docker run -d -p 5000:5000 --name registry registry:latest

# docker run --entrypoint htpasswd httpd:2 -Bbn user 123456 > htpasswd