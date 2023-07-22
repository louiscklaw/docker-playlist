#!/usr/bin/env bash

set -x

docker rmi openbox-ubuntu

set -ex

# build openbox as base
cd dockerfiles/ubuntu
  docker build . -t openbox-ubuntu
cd -

# build openbox as base
cd dockerfiles/openbox
  docker build . -t openbox-ubuntu
cd -

cd dockerfiles/apps
  docker build -f dockerfile.vnc . -t openbox-ubuntu
  docker build -f dockerfile.firefox . -t openbox-ubuntu
cd -

# finialize docker
cd dockerfiles/final
  docker build . \
    --build-arg="ANDROID_API_LEVEL=$ANDROID_API_LEVEL" \
    -t openbox-ubuntu
cd -

docker run --rm -it \
  --privileged \
  --device /dev/kvm \
  -v ./share:/share \
  -p 6080:6080 \
  -p 4723:4723 \
  --name logickee_docker_android openbox-ubuntu

  # -v /root/.config:/share/.config:ro \
  # -p 15900:5900 \
#   # bash
#   # bash

# docker run -d -p 127.0.0.1:5901:5901 fullaxx/ubuntu-desktop
