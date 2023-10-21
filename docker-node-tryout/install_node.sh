#!/usr/bin/env bash

set -x

apt update

rm -r /etc/apt/sources.list.d/nodesource.list
rm -r /etc/apt/keyrings/nodesource.gpg

# Download and import the Nodesource GPG key
apt-get install -y ca-certificates curl gnupg

mkdir -p /etc/apt/keyrings

curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | \
  gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Create deb repository
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# Run Update and Install
apt-get update
apt-get install nodejs -y
apt-get install yarn -y

# Uninstall nodejs Ubuntu & Debian packages
# apt-get purge nodejs &&\
# rm -r /etc/apt/sources.list.d/nodesource.list &&\
# rm -r /etc/apt/keyrings/nodesource.gpg

node -v
