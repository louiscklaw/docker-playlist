#!/usr/bin/env bash

set -x

# stop monitoring before stopping services
pushd ~/_workspace/docker-playlist/docker-uptime-kuma-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-healthcheck-tryout
  npm run docker_stop
popd

# stop api router

pushd ~/_workspace/traefik-playlist/production
  npm run docker_stop
popd


# stop services
pushd ~/_workspace/docker-playlist/docker-changedetection-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-portainer-tryout
  npm run docker_stop
popd

pushd ~/_workspace/nodejs-airdrop
  npm run docker_stop
popd

pushd ~/_workspace/briefing-playlist/meet.louislabs.com
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-n8n-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-crontab-tryout/production
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-watchtower-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/v2raya-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-checkmk-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-registry-tryout
  npm run docker_stop
popd

# stop routing related stuff

pushd ~/_workspace/docker-playlist/docker-traefik-cloudflare-companion-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-cloudflare-ddns-tryout
  npm run docker_stop
popd
