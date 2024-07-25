#!/bin/bash

git fetch --tags --quiet

# check if tags were fetched, if not exit
if [ $? -ne 0 ]; then
    echo -e "\e[0;31;49mFailed to fetch tags. Exiting...\e[0m"
    exit 0
fi

latest_tag=$(git tag --sort=-version:refname | head -n 1)
latest_tag=${latest_tag#v}

git push origin "$latest_tag"

echo -e "\e[0;34;49mTag pushed.\e[0m"