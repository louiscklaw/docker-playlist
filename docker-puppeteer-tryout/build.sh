#!/usr/bin/env bash

set -ex

rm -rf docker-puppeteer-tryout/screenshots

cd docker-puppeteer-tryout
    docker-compose -f docker-compose.integration-tests.yml run tests

    ls screenshots/
cd ..