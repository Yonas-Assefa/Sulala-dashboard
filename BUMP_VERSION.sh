#!/bin/bash

git fetch --tags

current_branch=$(git symbolic-ref --short HEAD)

latest_tag=$(git describe --tags --abbrev=0)
latest_tag=${latest_tag#v}

if [ "$current_branch" == "main" ]; then
    if git rev-parse -q --verify refs/tags/latest >/dev/null; then
        git tag -d latest
        git push --delete origin latest
    fi
    git tag -a latest -m "Latest version" "$(git rev-parse HEAD)"
    git push origin latest
    echo "Only tags are pushed to origin, not the code"
else
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
fi