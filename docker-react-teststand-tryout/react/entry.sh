#!/usr/bin/env bash

set -ex

mkdir -p /home/logic/_workspace/LynkedKK

pushd /home/logic/_workspace/LynkedKK
  pushd ./lynked-demo-tryout/meny-light-demo/meny-manage
    scripts/dev.sh &
  popd

  # pushd ./lynked-demo-tryout/meny-light-demo/meny-client
  #   scripts/dev.sh &
  # popd

  # pushd ./lynked-demo-tryout/meny-light-demo/meny-admin
  #   scripts/dev.sh &
  # popd

popd

wait
