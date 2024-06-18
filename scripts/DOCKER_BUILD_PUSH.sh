#!/bin/bash

# Build the Docker image
docker build -t sulala-dashboard ../

# get latest tag from git
latest_tag=$(git describe --tags --abbrev=0)
latest_tag=${latest_tag#v}

# tag the docker image with the current version and latest tag
docker tag sulala-dashboard yosephtadesse/sulala-dashboard:$latest_tag
docker tag sulala-dashboard yosephtadesse/sulala-dashboard:latest

# push the docker image to docker hub
docker push yosephtadesse/sulala-dashboard:$latest_tag
docker push yosephtadesse/sulala-dashboard:latest