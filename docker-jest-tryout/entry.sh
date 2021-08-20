#!/usr/bin/env bash

set -ex

mkdir -p /home/logic/_workspace/LynkedKK

pushd /home/logic/_workspace/LynkedKK
  # rm -rf lynked-demo-test-script-tryout || true

  # git clone \
  #   --depth 10 \
  #   -b master \
  #   https://$GITHUB_TOKEN@github.com/louiscklaw/lynked-demo-test-script-tryout.git

  # chmod 777 -R lynked-demo-test-script-tryout

  pushd ./lynked-demo-test-script-tryout/e2e
    yarn --dev
    yarn add request
    scripts/test.sh


popd
