#!/usr/bin/env bash

set -ex

rm -rf webpack-helloworld
mkdir -p webpack-helloworld

pushd webpack-helloworld
  npm init -y
  npm install webpack webpack-cli --save-dev
popd
