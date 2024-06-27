FROM alpine:latest

# Install docker-cli and cron
RUN apk update && \
    apk add --no-cache docker-cli docker openrc && \
    rc-update add docker boot

# Copy the cron job script and configuration file
COPY prune.sh /usr/local/bin/prune.sh
COPY crontab.txt /etc/crontabs/root

# Make the script executable
RUN chmod +x /usr/local/bin/prune.sh

# Start cron service
CMD ["crond", "-f"]
