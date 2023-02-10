#!/usr/bin/env bash

set -ex

pushd avgle
  docker compose kill
  docker compose down
  docker compose up -d --build
  # docker compose logs -f
popd

pushd av01.tv
  docker compose kill
  docker compose down
  docker compose up -d --build
  # docker compose logs -f
popd

pushd jable.tv
  docker compose kill
  docker compose down
  docker compose up -d --build
  # docker compose logs -f
popd

pushd kissjav
  docker compose kill
  docker compose down
  docker compose up -d --build
  # docker compose logs -f
popd

pushd missav
  docker compose kill
  docker compose down
  docker compose up -d --build
  # docker compose logs -f
popd


# docker compose -f ./docker-compose-debug-browserless-chrome.yml kill
# docker compose -f ./docker-compose-debug-browserless-chrome.yml down
# docker compose -f ./docker-compose-debug-browserless-chrome.yml up -d --build
# docker compose -f ./docker-compose-debug-browserless-chrome.yml logs -f

# docker compose -f ./docker-compose-playwright.yml kill
# docker compose -f ./docker-compose-playwright.yml down
# docker compose -f ./docker-compose-playwright.yml up -d --build
# # docker compose -f ./docker-compose-playwright.yml logs -f

# docker compose -f ./docker-compose-helloworld.yml kill
# docker compose -f ./docker-compose-helloworld.yml down
# docker compose -f ./docker-compose-helloworld.yml up -d --build

# docker compose -f ./docker-compose-carousell-changedetect.yml kill
# docker compose -f ./docker-compose-carousell-changedetect.yml down
# docker compose -f ./docker-compose-carousell-changedetect.yml up -d --build

# docker compose -f ./docker-compose-private-changedetect.yml kill
# docker compose -f ./docker-compose-private-changedetect.yml down
# docker compose -f ./docker-compose-private-changedetect.yml up -d --build

# docker compose -f ./docker-compose-taobao-changedetect.yml kill
# docker compose -f ./docker-compose-taobao-changedetect.yml down
# docker compose -f ./docker-compose-taobao-changedetect.yml up -d --build

# docker compose -f ./docker-compose-changedetection-io.yml kill
# # docker compose -f ./docker-compose-changedetection-io.yml down
# # docker compose -f ./docker-compose-changedetection-io.yml up -d --build

# docker compose -f ./docker-compose-playwright.yml kill

#sleep 1

#docker compose -f ./docker-compose-playwright.yml down

#sleep 1

#docker compose -f ./docker-compose-playwright.yml up -d --build
