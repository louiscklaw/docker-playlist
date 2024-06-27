docker run -d --name docker-cron-prune --restart unless-stopped -v /var/run/docker.sock:/var/run/docker.sock docker-cron-prune
