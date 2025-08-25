# #!/bin/bash

# # This script automates the process of generating language-specific code
# # and schema files from the .proto definitions using Docker.

# # Exit immediately if a command exits with a non-zero status.
# set -e

# IMAGE_NAME="proto-builder"
# OUTPUT_DIR="./generated"

# echo "--- Cleaning up old artifacts..."
# rm -rf $OUTPUT_DIR

# echo "--- Building the Docker image ($IMAGE_NAME)..."
# docker build -t $IMAGE_NAME .

# echo "--- Generating artifacts by copying from the container..."
# CONTAINER_ID=$(docker create $IMAGE_NAME)
# docker cp "${CONTAINER_ID}:/app/generated/." $OUTPUT_DIR
# docker rm -f $CONTAINER_ID > /dev/null

# echo "--- Successfully generated artifacts in '$OUTPUT_DIR' directory."
#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

IMAGE_NAME="proto-builder-2"
OUTPUT_DIR="./generated"

# Function to prompt user
prompt_user() {
    read -p "$1 (Press Enter to continue or Ctrl+C to abort)"
}

# Function for final status
show_final_status() {
    if [ $? -eq 0 ]; then
        echo -e "\n✅ Operation completed successfully!"
    else
        echo -e "\n❌ Operation failed!"
    fi
    read -p "Press any key to exit..."
}

# Set trap for final status
trap show_final_status EXIT

prompt_user "Step 1: About to clean up old artifacts in $OUTPUT_DIR directory."
echo "--- Cleaning up old artifacts..."
rm -rf $OUTPUT_DIR

prompt_user "Step 2: About to build Docker image named '$IMAGE_NAME'."
echo "--- Building the Docker image ($IMAGE_NAME)..."
docker build -t $IMAGE_NAME .

prompt_user "Step 3: About to generate artifacts by copying from the container."
echo "--- Generating artifacts by copying from the container..."
CONTAINER_ID=$(docker create $IMAGE_NAME)
docker cp "${CONTAINER_ID}:/app/generated/." $OUTPUT_DIR
docker rm -f $CONTAINER_ID > /dev/null

echo "--- Successfully generated artifacts in '$OUTPUT_DIR' directory."