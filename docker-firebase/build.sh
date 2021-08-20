#!/usr/bin/env bash

set -ex

sudo rm -rf /home/logic/_workspace/docker-playlist/docker-firebase/helloworld-firebase-project/.ash_history

sudo rm -rf /home/logic/_workspace/docker-playlist/docker-firebase/helloworld-firebase-project/.cache


pushd helloworld-firebase-project
  docker build -t logickee/docker-firebase -f dockerfile .
  docker push logickee/docker-firebase

popd

# docker run -it logickee/docker-firebase sh