#!/usr/bin/env bash

set -ex

# pushd jest
#   sudo rm -rf lynked-demo-test-script-tryout
#   git clone \
#     --depth 3 \
#     -b master \
#     https://$GITHUB_TOKEN@github.com/louiscklaw/lynked-demo-test-script-tryout.git || true &
# popd

# pushd react
#   sudo rm -rf lynked-demo-tryout
#   git clone \
#     --depth 3 \
#     -b test/meny-light-demo/new-feature/MENY-117/helloworld \
#     https://$GITHUB_TOKEN@github.com/louiscklaw/lynked-demo-tryout.git || true &
# popd

# pushd firebase
#   sudo rm -rf lynked-demo-tryout
#   git clone \
#     --depth 3 \
#     -b test/meny-light-demo/new-feature/MENY-117/helloworld \
#     https://$GITHUB_TOKEN@github.com/louiscklaw/lynked-demo-tryout.git || true &
# popd

wait

# pushd jest
#   docker build . -t logickee/puppeteer-jest --no-cache
#   docker push logickee/puppeteer-jest
# popd

docker-compose pull
# docker-compose build
docker-compose kill
docker-compose down --remove-orphans
docker-compose rm

sleep 1

docker-compose up -d &

echo 'sleep a while'
sleep 3

docker-compose logs -f

docker-compose ps
