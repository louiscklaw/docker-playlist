#!/usr/bin/env bash

set -ex

rm -rf **/node_modules

docker build . -t test
docker run -it -p 3000:3000 test