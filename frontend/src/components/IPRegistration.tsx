import React, { useState } from 'react';
import { useStoryProtocol } from '@story-protocol/react-sdk';
import { STORY_PROTOCOL_CONFIG } from '../config/storyProtocol';
import './IPRegistration.css';

export const IPRegistration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { protocol, isInitialized, error } = useStoryProtocol();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!STORY_PROTOCOL_CONFIG.supportedFileTypes.includes(selectedFile.type)) {
      alert('Invalid file type. Please select a supported file type.');
      return;
    }

    // Validate file size
    if (selectedFile.size > STORY_PROTOCOL_CONFIG.maxFileSize) {
      alert('File too large. File size must be less than 10MB.');
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!protocol || !isInitialized) {
      alert('Story Protocol is not initialized');
      return;
    }

    try {
      setIsLoading(true);
      setProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      // Register IP
      const result = await protocol.registerIP({
        name,
        description,
        metadata: {
          uri: file ? URL.createObjectURL(file) : '',
          hash: file ? await calculateFileHash(file) : '',
        },
      });

      clearInterval(progressInterval);
      setProgress(100);

      alert('IP registered successfully');

      // Reset form
      setName('');
      setDescription('');
      setFile(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to register IP');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateFileHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  if (error) {
    return (
      <div className="ip-registration-error">
        Error initializing Story Protocol: {error.message}
      </div>
    );
  }

  return (
    <div className="ip-registration">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter IP name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter IP description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">File (Optional)</label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept={STORY_PROTOCOL_CONFIG.supportedFileTypes.join(',')}
          />
          <small>
            Supported formats: {STORY_PROTOCOL_CONFIG.supportedFileTypes.join(', ')}
            <br />
            Max size: {STORY_PROTOCOL_CONFIG.maxFileSize / (1024 * 1024)}MB
          </small>
        </div>

        {isLoading && (
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Registering IP...' : 'Register IP'}
        </button>
      </form>
    </div>
  );
}; 