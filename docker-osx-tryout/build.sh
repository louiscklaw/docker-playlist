#!/usr/bin/env bash

set -ex

# 40GB disk space required: 20GB original image 20GB your container.
docker pull sickcodes/docker-osx:auto

# boot directly into a real OS X shell with a visual display [NOT HEADLESS]
docker run -it \
    --name osx \
    --device /dev/kvm \
    -p 50922:10022 \
    -p 54002:4000 \
    -p 58888:8888 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e GENERATE_UNIQUE=true \
    sickcodes/docker-osx:auto

# username is user
# passsword is alpine

