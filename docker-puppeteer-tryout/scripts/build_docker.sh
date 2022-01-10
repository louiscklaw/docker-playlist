#!/usr/bin/env bash

set -ex

pushd example/docker
  docker build -t logickee/puppeteer -f Dockerfile .
  docker push logickee/puppeteer
popd

