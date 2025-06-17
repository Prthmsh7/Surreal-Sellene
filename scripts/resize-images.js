const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIAGRAMS_DIR = path.join(__dirname, '../diagrams');
const RESIZE_PERCENTAGE = 75;

async function resizeImages() {
  try {
    // Read all files in the diagrams directory
    const files = fs.readdirSync(DIAGRAMS_DIR);

    // Filter for image files
    const imageFiles = files.filter(file => 
      file.endsWith('.png') || 
      file.endsWith('.jpg') || 
      file.endsWith('.jpeg')
    );

    console.log('Found images to resize:', imageFiles);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(DIAGRAMS_DIR, file);
      const outputPath = path.join(DIAGRAMS_DIR, `resized-${file}`);

      // Get original image metadata
      const metadata = await sharp(inputPath).metadata();
      
      // Calculate new dimensions
      const newWidth = Math.round(metadata.width * (RESIZE_PERCENTAGE / 100));
      const newHeight = Math.round(metadata.height * (RESIZE_PERCENTAGE / 100));

      console.log(`Resizing ${file} from ${metadata.width}x${metadata.height} to ${newWidth}x${newHeight}`);

      // Resize the image
      await sharp(inputPath)
        .resize(newWidth, newHeight)
        .toFile(outputPath);

      console.log(`Successfully resized ${file}`);
    }

    console.log('All images have been resized successfully!');
  } catch (error) {
    console.error('Error resizing images:', error);
  }
}

resizeImages(); 