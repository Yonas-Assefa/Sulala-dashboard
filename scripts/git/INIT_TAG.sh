#!/bin/bash

cd "$(git rev-parse --show-toplevel)"

recent_commit_message=$(git log -n 1)

if [[ $recent_commit_message =~ (--patch|#patch) ]]; then
  version_increment="--patch"
elif [[ $recent_commit_message =~ (--minor|#minor) ]]; then
  version_increment="--minor"
elif [[ $recent_commit_message =~ (--major|#major) ]]; then
  version_increment="--major"
else
  version_increment="--patch"
fi

if [[ $recent_commit_message =~ \#skip ]]; then
  echo -e "\e[0;33;40mSkipping versioning script due to #skip directive in commit message.\e[0m"
  exit 0
fi

./scripts/git/BUMP_VERSION.sh "$version_increment"