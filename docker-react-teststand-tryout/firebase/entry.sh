#!/usr/bin/env bash

set -ex

mkdir -p /home/logic/_workspace/LynkedKK

pushd /home/logic/_workspace/LynkedKK
  pushd ./lynked-demo-tryout/meny-light-demo/firebase
    ./start_fb.sh
  popd

popd
