#!/usr/bin/env bash

# Quick Installer for QEWD HIT Platform

# This starts the Node-Runner Container with the correct environment settings and parameters

VOLUME=${1-$PWD}

echo 'Running Node-Runner Container with volume '$VOLUME

echo 'If you are running this for the first time, the Node-Runner Container'
echo 'will first be downloaded from Docker Hub.'
echo 'If so, please wait for it to load'

# Create the Docker networks unless they already exist

docker network ls|grep qewd-hit > /dev/null || docker network create qewd-hit
docker network ls|grep ecis-net > /dev/null || docker network create ecis-net

docker run -it --name installer --rm -v $VOLUME:/node -e "node_script=quick-install" -e "DOCKER_HOST=$(ip -4 addr | grep -Po 'inet \K[\d.]+')" -e "HOST_VOLUME=$VOLUME" rtweed/node-runner

