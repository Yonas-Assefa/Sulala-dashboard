#!/bin/bash

cd "$(git rev-parse --show-toplevel)"

# Function to get the version increment argument based on commit message
getVersionIncrementArg() {
  local recent_commit_message
  recent_commit_message=$(git log -n 1 --pretty=format:%s)

  local version_increment

  if [[ $recent_commit_message =~ (--patch|#patch) ]]; then
    version_increment="--patch"
  elif [[ $recent_commit_message =~ (--minor|#minor) ]]; then
    version_increment="--minor"
  elif [[ $recent_commit_message =~ (--major|#major) ]]; then
    version_increment="--major"
  else
    version_increment=""
  fi

  echo "$version_increment"
}

# Function to validate version bump conditions
validateVersionBump() {
  local recent_commit_message
  recent_commit_message=$(git log -n 1 --pretty=format:%s)

  # Check for #skip directive in commit message
  if [[ $recent_commit_message =~ \#skip ]]; then
    printf "\e[0;33;49mSkipping versioning script due to #skip directive in commit message.\e[0m\n"
    exit 0
  fi

  # Check if not on main or master branch
  local current_branch
  current_branch=$(git symbolic-ref --short HEAD)

  if [[ $current_branch != "main" && $current_branch != "master" ]]; then
    printf "\e[0;35;49mNot on main or master branch. Skipping tag...\e[0m\n"
    exit 0
  fi
}

# Main function to orchestrate the version bump
main() {
  local confirm_version_bump
  read -p "Do you want to tag the current commit? (y/n): " confirm_version_bump

  if [[ $confirm_version_bump != "y" ]]; then
    printf "\e[0;33;49mSkipping versioning script...\e[0m\n"
    exit 0
  fi
  local version_increment_arg
  version_increment_arg=$(getVersionIncrementArg)

  validateVersionBump

  # Execute version bump script with the determined increment argument
  ./scripts/git/TAG.sh "$version_increment_arg"
}

# Call main function to start the script
main