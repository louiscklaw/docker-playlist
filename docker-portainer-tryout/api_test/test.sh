#!/usr/bin/env bash

set -ex

http POST http://192.168.10.21:9000/api/endpoints/2/docker/containers/create \
"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOjEsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE2NTc5MjIwMzEsImlhdCI6MTY1NzkwNzYzMX0.D_XGEvwgb0YaqzQ1Kohg4gybT5WaX2eZorGc2clZSqY" \
name=="web01" Image="nginx:latest" \
ExposedPorts:='{ "80/tcp": {} }' \
HostConfig:='{ "PortBindings": { "80/tcp": [{ "HostPort": "8080" }] } }'