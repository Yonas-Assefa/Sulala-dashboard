# Get the latest tag of the docker image

# echo -e "\e[0;36;49mPush the current tag with 'latest' tag? (y/n)\e[0m"
# read label_latest

# if [ "$label_latest" == "y" ]; then
#   echo -e "\e[0;32;49m[Yes]\e[0m pushing the current tag with 'latest' tag"
# else
#   echo -e "\e[0;31;49m[No]\e[0m skipping to push the 'latest' tag"
# fi

# local label_latest
latest_tag=$(docker images | grep sulala-dashboard | awk '{print $2}' | grep -v latest | grep -v none | sort -r | head -n 1)

# push the docker image to docker hub
docker push yosephtadesse/sulala-dashboard:$latest_tag
# if [ "$label_latest" == "y" ]; then
  docker push yosephtadesse/sulala-dashboard:latest
# fi

echo -e "\e[0;34;49mDocker image pushed to Docker Hub\e[0m"
echo -e "\e[0;33;49mDocker image tags: yosephtadesse/sulala-dashboard:$latest_tag\e[0m"