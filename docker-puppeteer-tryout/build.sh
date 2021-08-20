#!/usr/bin/env bash

set -ex

docker build -t logickee/puppeteer -f Dockerfile .

docker push logickee/puppeteer
