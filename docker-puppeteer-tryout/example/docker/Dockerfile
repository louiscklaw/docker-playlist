FROM node:14.16.0-buster-slim@sha256:ffc15488e56d99dbc9b90d496aaf47901c6a940c077bc542f675ae351e769a12
RUN  apt-get update 

RUN  apt-get install -y wget gnupg ca-certificates procps libxss1
RUN  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN  apt-get update

# We install Chrome to get all the OS level dependencies, but Chrome itself
# is not actually used as it's packaged in the node puppeteer library.
# Alternatively, we could could include the entire dep list ourselves
# (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
# but that seems too easy to get out of date.
RUN  apt-get install -y google-chrome-stable
RUN  rm -rf /var/lib/apt/lists/*

# && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh
# && chmod +x /usr/sbin/wait-for-it.sh
ADD wait-for-it.sh /usr/sbin/wait-for-it.sh
RUN chmod +x /usr/sbin/wait-for-it.sh

# Install Puppeteer under /node_modules so it's available system-wide
ADD package.json package-lock.json /
RUN npm install

RUN  npm i mocha
ENV  PATH="${PATH}:/node_modules/.bin"