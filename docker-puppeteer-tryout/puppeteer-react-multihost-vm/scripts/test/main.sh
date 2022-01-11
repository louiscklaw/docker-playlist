#!/usr/bin/env bash

set -ex

scripts/test/setup.sh

pushd tests_host
  yarn --dev
popd

pushd tests_host
  yarn run int_test
popd

echo 'test setup done'
