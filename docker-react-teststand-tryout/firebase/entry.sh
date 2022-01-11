#!/usr/bin/env bash

set -ex

mkdir -p /home/logic/_workspace/LynkedKK

pushd /home/logic/_workspace/LynkedKK
  pushd ./lynked-demo-tryout/meny-light-demo/firebase/functions
    npm install
  popd

  pushd ./lynked-demo-tryout/meny-light-demo/firebase
    ./start_fb.sh &
  popd

  ./wait-ready.sh

  pushd ./lynked-demo-test-script-tryout
    npm install
   ./scripts/load_ac.sh &
   ./scripts/load_db.sh &
  popd
popd

wait
