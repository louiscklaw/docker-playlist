#!/usr/bin/env bash

set -ex


pushd example
  docker-compose -f docker-compose.integration-tests.yml build tests
  docker-compose -f docker-compose.integration-tests.yml run tests

  ls screenshots/app.png

popd
