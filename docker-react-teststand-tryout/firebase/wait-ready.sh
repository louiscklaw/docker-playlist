#!/usr/bin/env bash

# ┌─────────────────────────────────────────────────────────────┐
# │ ✔  All emulators ready! It is now safe to connect your app. │
# │ i  View Emulator UI at http://0.0.0.0:4000                  │
# └─────────────────────────────────────────────────────────────┘
#
# ┌────────────────┬──────────────┬───────────────────────────────┐
# │ Emulator       │ Host:Port    │ View in Emulator UI           │
# ├────────────────┼──────────────┼───────────────────────────────┤
# │ Authentication │ 0.0.0.0:9099 │ http://0.0.0.0:4000/auth      │
# ├────────────────┼──────────────┼───────────────────────────────┤
# │ Functions      │ 0.0.0.0:5001 │ http://0.0.0.0:4000/functions │
# ├────────────────┼──────────────┼───────────────────────────────┤
# │ Firestore      │ 0.0.0.0:8080 │ http://0.0.0.0:4000/firestore │
# ├────────────────┼──────────────┼───────────────────────────────┤
# │ Database       │ 0.0.0.0:9000 │ http://0.0.0.0:4000/database  │
# ├────────────────┼──────────────┼───────────────────────────────┤
# │ Hosting        │ 0.0.0.0:5002 │ n/a                           │
# ├────────────────┼──────────────┼───────────────────────────────┤
# │ Storage        │ 0.0.0.0:9199 │ http://0.0.0.0:4000/storage   │
# └────────────────┴──────────────┴───────────────────────────────┘
  # Emulator Hub running at localhost:4400
  # Other reserved ports: 4500

set -ex

./wait-for-it.sh firebase:9099 -t 0
./wait-for-it.sh firebase:9000 -t 0
./wait-for-it.sh firebase:8080 -t 0
./wait-for-it.sh firebase:5001 -t 0
./wait-for-it.sh firebase:5002 -t 0
./wait-for-it.sh firebase:9199 -t 0

./wait-for-it.sh firebase:4000 -t 0

# ./wait-for-it.sh firebase:4400 -t 0
# ./wait-for-it.sh firebase:4500 -t 0
