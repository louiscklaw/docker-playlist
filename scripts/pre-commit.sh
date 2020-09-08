#!/usr/bin/env bash

set -e

echo 'updating master_build.yml...'
./scripts/update_main_build_chain.sh

echo 'adding master_build.yml into commit...'
git add /home/logic/_workspace/docker-playlist/.github/workflows/master_build.yml
