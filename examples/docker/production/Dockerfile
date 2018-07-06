
#
# Local Cloud Sparc-Server  
#

FROM ubuntu:18.04


# create the Working Directory
RUN mkdir -p /usr/src/localCloud

# install all dependencies and delete them in ONE single RUN
# you can split this into different steps, but this will make the Image MUCH larger!
RUN apt-get update; \
    apt-get install -y git nodejs npm; \
    cd /usr/src/localCloud; \
    git clone https://github.com/Brewskey/spark-server.git; \
    cd  /usr/src/localCloud/spark-server; \
    rm -rf .git; \
    npm install; \
    # dirty hack to avoid error on launch
    mkdir node_modules/spark-protocol/third-party; \
    echo "[]" > node_modules/spark-protocol/third-party/settings.json




# Set Working Directory
WORKDIR /usr/src/localCloud/spark-server


# Expose SparkPort to be mapped
EXPOSE 5683

# Expose ServerPort for API
EXPOSE 8080

# Expose DataDirectory to store DB and Device Keys 
VOLUME /usr/src/localCloud/spark-server/data



ENTRYPOINT ["npm", "run", "start:prod"]



