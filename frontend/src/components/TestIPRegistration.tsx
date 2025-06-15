import React, { useState } from 'react';
import { useStory } from '../contexts/StoryContext';
import { useAccount } from 'wagmi';

export function TestIPRegistration() {
  const { address } = useAccount();
  const { registerIP, loading, error, registeredIPs } = useStory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await registerIP(title, description, file || undefined);
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Test IP Registration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">File (optional):</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Registering...' : 'Register IP'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-bold">Registered IPs:</h3>
        {registeredIPs.length === 0 ? (
          <p>No IPs registered yet</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {registeredIPs.map((ip, index) => (
              <li key={index} className="p-2 border rounded">
                <p className="font-bold">{ip.title}</p>
                <p>{ip.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 