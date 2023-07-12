#!/usr/bin/env bash

set -ex

pushd ~/_workspace/traefik-playlist/production
  docker compose up -d
popd

pushd ~/_workspace/docker-playlist
  pushd docker-traefik-cloudflare-companion-tryout
    npm run docker_rebuild
  popd
popd

# start proxy before applications
pushd ~/_workspace/docker-playlist
  pushd v2raya-tryout
    npm run docker_rebuild
  popd
popd

sleep 1

pushd ~/_workspace/docker-playlist/docker-portainer-tryout
  npm run docker_rebuild
popd

# start services

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

pushd ~/_workspace/docker-playlist/docker-changedetection-tryout
  npm run docker_rebuild
popd

pushd ~/_workspace/docker-playlist/docker-crontab-tryout/production
  npm run docker_rebuild
popd

# start monitoring after start services

pushd ~/_workspace/docker-playlist/docker-uptime-kuma-tryout
  npm run docker_rebuild
popd

pushd ~/_workspace/docker-playlist/docker-healthcheck-tryout
  npm run docker_rebuild
popd

pushd ~/_workspace/docker-playlist/docker-watchtower-tryout
  npm run docker_rebuild
popd

pushd ~/_workspace/docker-playlist/docker-checkmk-tryout
  npm run docker_rebuild
popd
