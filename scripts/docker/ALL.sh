#!/bin/bash

# Build the Docker image
docker build -t sulala-dashboard .

# check if the build was successful
if [ $? -ne 0 ]; then
  echo -e "\e[0;31;40mDocker build failed\e[0m"
  exit 1
fi

# get latest tag from git
latest_tag=$(git describe --tags --abbrev=0)
latest_tag=${latest_tag#v}

echo -e "\e[0;36;40mLabel the current tag with 'latest' tag? (y/n)\e[0m"
read label_latest

if [ "$label_latest" == "y" ]; then
  echo -e "\e[0;32;40mYes\e[0m"
else
  echo -e "\e[0;31;40mNo\e[0m"
fi

# tag the docker image with the current version and latest tag
docker tag sulala-dashboard yosephtadesse/sulala-dashboard:$latest_tag
if [ "$label_latest" == "y" ]; then
  docker tag sulala-dashboard yosephtadesse/sulala-dashboard:latest
fi

# push the docker image to docker hub
docker push yosephtadesse/sulala-dashboard:$latest_tag
if [ "$label_latest" == "y" ]; then
  docker push yosephtadesse/sulala-dashboard:latest
fi

echo -e "\e[0;34;40mDocker image pushed to Docker Hub\e[0m"
echo -e "\e[0;33;40mDocker image tags: yosephtadesse/sulala-dashboard:$latest_tag\e[0m"