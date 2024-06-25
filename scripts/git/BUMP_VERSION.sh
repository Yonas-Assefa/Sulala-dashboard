#!/bin/bash

git fetch --tags --quiet

# check if tags were fetched, if not exit
if [ $? -ne 0 ]; then
    echo -e "\e[0;31;49mFailed to fetch tags. Exiting...\e[0m"
    exit 0
fi

# current_branch=$(git symbolic-ref --short HEAD)

# latest_tag=$(git describe --tags --abbrev=0)
latest_tag=$(git tag --sort=-version:refname | head -n 1)
latest_tag=${latest_tag#v}

IFS='.' read -r -a version_parts <<< "$latest_tag"
major=${version_parts[0]}
minor=${version_parts[1]}
patch=${version_parts[2]}

if [ "$1" == "--patch" ]; then
    echo -e "\e[0;33;49mpatch argument detected. Incrementing patch version\e[0m"
    patch=$((patch + 1))
elif [ "$1" == "--minor" ]; then
    echo -e "\e[0;33;49mminor argument detected. Incrementing minor version\e[0m"
    minor=$((minor + 1))
    patch=0
elif [ "$1" == "--major" ]; then
    echo -e "\e[0;33;49mmajor argument detected. Incrementing major version\e[0m"
    major=$((major + 1))
    minor=0
    patch=0
elif [ -z "$1" ]; then
    echo -e "\e[0;33;49mNo argument detected. Incrementing patch version\e[0m"
    patch=$((patch + 1))
else
    echo -e "\e[0;31;49mInvalid argument. Exiting...\e[0m"
    exit 1
fi

new_tag="v$major.$minor.$patch"

git tag -a "$new_tag" -m "Version $new_tag"
git push origin "$new_tag" --quiet

echo -e "\e[0;34;49mTagging finished.\e[0m"
echo -e "\e[0;32;49mNew tag is $new_tag\e[0m"

# sed -i "s/\"version\": \".*\"/\"version\": \"$major.$minor.$patch\"/g" package.json
# git add package.json
# echo "Updated package.json version to $major.$minor.$patch"
