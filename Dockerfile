FROM ubuntu:14.04
MAINTAINER Nguyen Sy Thanh Son <thanhson1085@gmail.com>

RUN apt-get update && \
    apt-get install -y supervisor sqlite3 build-essential wget
RUN \
    cd /tmp && \
    wget http://nodejs.org/dist/node-latest.tar.gz && \
    tar xvzf node-latest.tar.gz && \
    rm -f node-latest.tar.gz && \
    cd node-v* && \
    ./configure && \
    CXX="g++ -Wno-unused-local-typedefs" make && \
    CXX="g++ -Wno-unused-local-typedefs" make install
RUN \
    cd /tmp && \
    rm -rf /tmp/node-v* && \
    npm install -g npm && \
    printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

RUN apt-get install -y python-pip python-dev

RUN node -v && npm -v
RUN npm install -g nodemon
RUN npm install -g bower
RUN npm install -g grunt-cli

WORKDIR /build
ADD . /build
RUN npm install

RUN pip install supervisor-stdout
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord"]
