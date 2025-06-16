import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useStory } from './StoryContext';

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  profilePicture: string;
  badges: Array<{ name: string; color: string }>;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  stats: {
    totalSales: string;
    totalPurchases: string;
    itemsCreated: number;
    itemsSold: number;
  };
}

interface UserProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
}

const defaultContext: UserProfileContextType = {
  profile: null,
  loading: false,
  error: null,
  updateProfile: async () => {},
  uploadProfilePicture: async () => {},
};

const UserProfileContext = createContext<UserProfileContextType>(defaultContext);

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAuth();
  const { registeredIPs } = useStory();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      loadProfile();
    }
  }, [address]);

  const loadProfile = async () => {
    if (!address) return;

    try {
      setLoading(true);
      setError(null);

      // In a real implementation, this would fetch from your backend
      // For now, we'll use localStorage to persist profile data
      const savedProfile = localStorage.getItem(`profile_${address}`);
      
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        // Default profile for new users
        const defaultProfile: UserProfile = {
          name: `User ${address.slice(0, 6)}...${address.slice(-4)}`,
          username: `user_${address.slice(0, 6)}`,
          bio: 'Welcome to Sellene! Update your profile to get started.',
          profilePicture: 'https://bit.ly/broken-link',
          badges: [
            { name: 'New User', color: 'blue' }
          ],
          socialLinks: {
            github: '',
            twitter: '',
            linkedin: '',
            website: ''
          },
          stats: {
            totalSales: '0',
            totalPurchases: '0',
            itemsCreated: 0,
            itemsSold: 0
          }
        };
        setProfile(defaultProfile);
        localStorage.setItem(`profile_${address}`, JSON.stringify(defaultProfile));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!address || !profile) return;

    try {
      setLoading(true);
      setError(null);

      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      localStorage.setItem(`profile_${address}`, JSON.stringify(updatedProfile));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      console.error('Error updating profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    if (!address || !profile) return;

    try {
      setLoading(true);
      setError(null);

      // In a real implementation, this would upload to your storage service
      // For now, we'll use a mock URL
      const mockUrl = URL.createObjectURL(file);
      
      await updateProfile({ profilePicture: mockUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload profile picture');
      console.error('Error uploading profile picture:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        updateProfile,
        uploadProfilePicture
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
} 