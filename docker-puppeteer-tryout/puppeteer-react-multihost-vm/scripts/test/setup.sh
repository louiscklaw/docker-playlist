#!/usr/bin/env bash

set -ex

export BROWSER=none

killall node || true
killall node || true
killall node || true
killall node || true

pushd react_host_admin/App
  scripts/build.sh &
popd

pushd react_host_client/App
  scripts/build.sh &
popd

pushd react_host_cms/App
  scripts/build.sh &
popd

./scripts/wait-for-it.sh -t 60 localhost:3000
./scripts/wait-for-it.sh -t 60 localhost:3001
./scripts/wait-for-it.sh -t 60 localhost:3002

echo 'test setup done'
