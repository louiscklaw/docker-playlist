#!/usr/bin/env bash

set -ex

mkdir -p /home/logic/_workspace/LynkedKK

./wait-ready.sh

# pushd /home/logic/_workspace/LynkedKK
#   pushd ./lynked-demo-test-script-tryout/e2e
#     yarn --dev
#     # ./scripts/test.sh
#     bash ./scripts/helloworld.sh
#   popd

# popd

/bin/bash