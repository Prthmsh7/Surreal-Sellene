import { STORY_PROTOCOL_CONFIG } from '../config/storyProtocol';

export const validateFile = (file: File, type: 'text' | 'image' | 'music' | 'art' | 'writing') => {
  // Check file size
  if (file.size > STORY_PROTOCOL_CONFIG.maxFileSize) {
    throw new Error(`File size must be less than ${STORY_PROTOCOL_CONFIG.maxFileSize / (1024 * 1024)}MB`);
  }

  // Check file type
  const validTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    art: ['image/jpeg', 'image/png', 'image/gif'],
    music: ['audio/mpeg', 'audio/wav'],
    text: ['text/plain', 'application/pdf'],
    writing: ['text/plain', 'application/pdf'],
  };

  if (!validTypes[type].includes(file.type)) {
    throw new Error(`Invalid file type. Supported types for ${type}: ${validTypes[type].join(', ')}`);
  }
};

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Upload to IPFS via Story Protocol's API
    const response = await fetch(`${import.meta.env.VITE_STORY_API_URL}/ipfs/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to IPFS');
    }

    const data = await response.json();
    return data.url; // This should be the IPFS URL
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export async function generateMetadata(
  name: string,
  description: string,
  imageUrl: string,
  type: string
): Promise<any> {
  const metadata = { ...STORY_PROTOCOL_CONFIG.metadataTemplate };
  metadata.name = name;
  metadata.description = description;
  metadata.image = imageUrl;
  metadata.attributes[0].value = type;
  metadata.attributes[1].value = new Date().toISOString();

  return metadata;
} 