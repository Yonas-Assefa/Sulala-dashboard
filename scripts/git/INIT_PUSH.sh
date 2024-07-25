#!/bin/bash

cd "$(git rev-parse --show-toplevel)"



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
  validateVersionBump

  # Execute version bump script with the determined increment argument
  ./scripts/git/PUSH.sh
}

# Call main function to start the script
main