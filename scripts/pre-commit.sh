#!/usr/bin/env bash

set -e

echo 'updating master_build.yml...'
./update_main_build_chain.sh

echo 'adding master_build.yml into commit...'
git add .
