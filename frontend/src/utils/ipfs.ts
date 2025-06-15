import { STORY_PROTOCOL_CONFIG } from '../config/storyProtocol';

export async function uploadToIPFS(file: File): Promise<string> {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Upload to IPFS
    const response = await fetch('https://api.web3.storage/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload to IPFS');
    }

    const data = await response.json();
    return `${STORY_PROTOCOL_CONFIG.ipfsGateway}${data.cid}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

export function validateFile(file: File, type: 'image' | 'music' | 'art' | 'writing'): boolean {
  // Check file size
  if (file.size > STORY_PROTOCOL_CONFIG.maxFileSize) {
    throw new Error(`File size exceeds maximum limit of ${STORY_PROTOCOL_CONFIG.maxFileSize / (1024 * 1024)}MB`);
  }

  // Check file type
  const supportedTypes = STORY_PROTOCOL_CONFIG.supportedFileTypes[type];
  if (!supportedTypes.includes(file.type)) {
    throw new Error(`Unsupported file type. Supported types for ${type} are: ${supportedTypes.join(', ')}`);
  }

  return true;
}

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