# Pull image from Docker Hub.
$ docker pull gogs/gogs

# Create local directory for volume.
$ mkdir -p ./volumes

# Use `docker run` for the first time.
$ docker run --name=gogs -p 10022:22 -p 10880:3000 -v ./volumes:/data gogs/gogs

# Use `docker start` if you have stopped it.
$ docker start gogs