#!/usr/bin/env bash

set -x

pushd ~/_workspace/docker-playlist/docker-uptime-kuma-tryout
  npm run docker_stop
popd

pushd ~/_workspace/docker-playlist/docker-healthcheck-tryout
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

pushd ~/_workspace/traefik-playlist/production
  npm run docker_stop
popd
