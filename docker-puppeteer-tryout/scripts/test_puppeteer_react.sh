#!/usr/bin/env bash

set -ex


pushd puppeteer-react
  docker-compose -f docker-compose.yml build tests_host
  docker-compose -f docker-compose.yml run tests_host
popd
