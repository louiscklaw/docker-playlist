#!/usr/bin/env bash

set -ex

rsync -avzh --progress react/lynked-demo-tryout logic@192.168.88.249:/home/logic/_workspace/docker-playlist/docker-react-teststand-tryout/react &

rsync -avzh --progress jest/lynked-demo-test-script-tryout logic@192.168.88.249:/home/logic/_workspace/docker-playlist/docker-react-teststand-tryout/jest &

rsync -avzh --progress firebase/lynked-demo-tryout logic@192.168.88.249:/home/logic/_workspace/docker-playlist/docker-react-teststand-tryout/firebase &

rsync -avzh --progress firebase/lynked-demo-test-script-tryout logic@192.168.88.249:/home/logic/_workspace/docker-playlist/docker-react-teststand-tryout/firebase &

wait
