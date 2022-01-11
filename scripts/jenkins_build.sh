#!/usr/bin/env bash

set -ex

pushd docker-puppeteer-tryout/puppeteer-react-multihost-vm
  scripts/test/main.sh
popd
