#!/usr/bin/env bash

set -ex

docker buildx build . -t 192.168.10.61:5000/node-src-16-helloworld

docker push 192.168.10.61:5000/node-src-16-helloworld

docker run -it \
    -v ./share:/share \
    -v ./src:/src \
    -v ./volumes:/volumes \
    -e NODE_PATH=/src/node_modules \
    --workdir /src \
    -p 8080 \
    -u 1000:1000 \
    192.168.10.61:5000/node-src-16-helloworld bash

# sudo chown 1000:1000 -R .
# sudo rm -rf ./src/node_modules

# docker compose up
