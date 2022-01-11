#!/usr/bin/env bash

set -ex

scripts/test/setup.sh

pushd tests_host
  mocha --recursive integration-tests
popd

echo 'test setup done'
