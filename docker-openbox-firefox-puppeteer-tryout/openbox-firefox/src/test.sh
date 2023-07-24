#!/usr/bin/env bash


set -x

rm -rf node_modules

PUPPETEER_PRODUCT=firefox npm i puppeteer-core

# node index.js
node poe_send_and_reply.js
# node client_side_evaluate.js
