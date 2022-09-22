#!/usr/bin/env bash

set -x

npm run docker_stop_carousell_change
sleep 1

node ./utils/carousell_update_script.js
sleep 1

npm run docker_start_carousell_change