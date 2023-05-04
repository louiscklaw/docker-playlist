#!/usr/bin/env bash

set -ex

pushd ~/_workspace/traefik-playlist/production
  docker compose up -d

popd

sleep 3

pushd ~/_workspace/docker-playlist/docker-portainer-tryout
  npm run docker_rebuild
popd

pushd ~/_workspace/docker-playlist/docker-uptime-kuma-tryout
  npm run docker_rebuild
popd

pushd ~/_workspace/docker-playlist/docker-healthcheck-tryout
  npm run docker_rebuild
popd

# carousell related
# upload file,
# https://share.louislabs.com/upload
pushd ~/_workspace/nodejs-airdrop
  npm run docker_rebuild
popd

# https://meet.louislaba.com
pushd ~/_workspace/briefing-playlist/meet.louislabs.com
  npm run docker_rebuild
popd

pushd ~/_workspace/docker-playlist/docker-n8n-tryout
  npm run docker_rebuild
popd
