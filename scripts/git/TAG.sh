#!/bin/bash

git fetch --tags --quiet

if [ $? -ne 0 ]; then
    echo -e "\e[0;31;49mFailed to fetch tags. Exiting...\e[0m"
    exit 0
fi
if [ "$1" == "--patch" ]; then
    echo -e "\e[0;33;49mpatch argument detected. Incrementing patch version\e[0m"
    npm version patch
elif [ "$1" == "--minor" ]; then
    echo -e "\e[0;33;49mminor argument detected. Incrementing minor version\e[0m"
    npm version minor
elif [ "$1" == "--major" ]; then
    echo -e "\e[0;33;49mmajor argument detected. Incrementing major version\e[0m"
    npm version major
elif [ -z "$1" ]; then
    echo -e "\e[0;33;49mNo argument detected. Incrementing patch version\e[0m"
    npm version patch
else
    echo -e "\e[0;31;49mInvalid argument. Exiting...\e[0m"
    exit 1
fi

if [ $? -ne 0 ]; then
    echo -e "\e[0;31;49mFailed to increment version. Exiting...\e[0m"
    exit 0
fi

new_tag=$(git tag --sort=-version:refname | head -n 1)

echo -e "\e[0;34;49mTagging finished.\e[0m"
echo -e "\e[0;32;49mNew tag is $new_tag\e[0m"

git push origin "$new_tag"

echo -e "\e[0;34;49mTag pushed to origin.\e[0m"
