#!/bin/bash

# This script automates the process of generating language-specific code
# and schema files from the .proto definitions using Docker.

# Exit immediately if a command exits with a non-zero status.
set -e

IMAGE_NAME="proto-builder"
OUTPUT_DIR="./generated"

echo "--- Cleaning up old artifacts..."
rm -rf $OUTPUT_DIR

echo "--- Building the Docker image ($IMAGE_NAME)..."
docker build -t $IMAGE_NAME .

echo "--- Generating artifacts by copying from the container..."
CONTAINER_ID=$(docker create $IMAGE_NAME)
docker cp "${CONTAINER_ID}:/app/generated/." $OUTPUT_DIR
docker rm -f $CONTAINER_ID > /dev/null

echo "--- Successfully generated artifacts in '$OUTPUT_DIR' directory."