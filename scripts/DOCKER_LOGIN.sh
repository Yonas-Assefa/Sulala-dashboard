#!/bin/bash

# read username
echo "Enter your Docker Hub username: "
read  username

# read password
echo "Enter your Docker Hub password: "
read -s password

# login to docker hub
echo $password | docker login --username $username --password-stdin

echo "Logged in to Docker Hub as $username"