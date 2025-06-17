#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first."
    exit 1
fi

# Directory containing the images
DIAGRAMS_DIR="../diagrams"

# Create resized directory if it doesn't exist
mkdir -p "${DIAGRAMS_DIR}/resized"

# Resize all PNG files in the diagrams directory
for img in "${DIAGRAMS_DIR}"/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "Resizing $filename..."
        convert "$img" -resize 75% "${DIAGRAMS_DIR}/resized/resized-${filename}"
    fi
done

echo "All images have been resized successfully!" 