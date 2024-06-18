#!/bin/bash

git fetch --tags

# check if tags were fetched, if not exit
if [ $? -ne 0 ]; then
    echo "Failed to fetch tags. Exiting..."
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
    echo "patch argument detected. Incrementing patch version"
    patch=$((patch + 1))
elif [ "$1" == "--minor" ]; then
    echo "minor argument detected. Incrementing minor version"
    minor=$((minor + 1))
    patch=0
elif [ "$1" == "--major" ]; then
    echo "major argument detected. Incrementing major version"
    major=$((major + 1))
    minor=0
    patch=0
elif [ -z "$1" ]; then
    echo "No argument detected. Incrementing patch version"
    patch=$((patch + 1))
else
    echo "Invalid argument. Exiting..."
    exit 1
fi

new_tag="v$major.$minor.$patch"

git tag -a "$new_tag" -m "Version $new_tag"
echo "Tagged with $new_tag"

git push origin "$new_tag"
echo "Pushed to origin"

echo "Tagging finished. New tag is $new_tag"

# sed -i "s/\"version\": \".*\"/\"version\": \"$major.$minor.$patch\"/g" package.json
# git add package.json
# echo "Updated package.json version to $major.$minor.$patch"
