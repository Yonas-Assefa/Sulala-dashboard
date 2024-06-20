#!/bin/bash

# get latest tag from git
latest_tag=$(git describe --tags --abbrev=0)
latest_tag=${latest_tag#v}

# push the docker image to docker hub
docker push yosephtadesse/sulala-dashboard:$latest_tag
docker push yosephtadesse/sulala-dashboard:latest