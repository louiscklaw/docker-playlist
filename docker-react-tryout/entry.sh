#!/usr/bin/env bash

set -ex



mkdir -p /home/logic/_workspace/LynkedKK

pushd /home/logic/_workspace/LynkedKK
  git clone \
    --depth 10 \
    -b test/meny-light-demo/new-feature/MENY-117/helloworld \
    https://$GITHUB_TOKEN@github.com/louiscklaw/lynked-demo-tryout.git


  pushd ./lynked-demo-tryout/meny-light-demo/meny-manage
    scripts/dev.sh &
  popd


  pushd ./lynked-demo-tryout/meny-light-demo/meny-client
    scripts/dev.sh &
  popd


  pushd ./lynked-demo-tryout/meny-light-demo/meny-admin
    scripts/dev.sh &
  popd


popd

wait
