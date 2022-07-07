#!/usr/bin/env bash

set -ex


docker build -t logickee/gatsby-helloworld-tryout gatsby_helloworld
docker image push logickee/gatsby-helloworld-tryout

docker build -t logickee/nextjs-helloworld-tryout nextjs_helloworld_js
docker image push logickee/nextjs-helloworld-tryout

docker build -t logickee/wiki-app-tryout wiki
docker image push logickee/wiki-app-tryout

docker build -t logickee/restaurant-cms-tryout restaurant_cms
docker image push logickee/restaurant-cms-tryout

docker build -t logickee/admin-cms-tryout admin_cms
docker image push logickee/admin-cms-tryout
