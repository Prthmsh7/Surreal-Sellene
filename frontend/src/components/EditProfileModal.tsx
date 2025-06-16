import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Avatar,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import { useUserProfile } from '../contexts/UserProfileContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { profile, updateProfile, uploadProfilePicture, loading } = useUserProfile();
  const [name, setName] = useState(profile?.name || '');
  const [username, setUsername] = useState(profile?.username || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        name,
        username,
        bio,
      });
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadProfilePicture(file);
      toast({
        title: 'Profile picture updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile picture',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="brand.darkerGray" borderColor="brand.lightGray" borderWidth="1px">
        <ModalHeader color="white">Edit Profile</ModalHeader>
        <ModalCloseButton color="white" />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={6}>
              <Box position="relative">
                <Avatar
                  size="2xl"
                  name={name}
                  src={profile?.profilePicture}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: 'none' }}
                  id="profile-picture-input"
                />
                <label htmlFor="profile-picture-input">
                  <IconButton
                    aria-label="Change profile picture"
                    icon={<FaCamera />}
                    position="absolute"
                    bottom="0"
                    right="0"
                    colorScheme="blue"
                    rounded="full"
                    size="sm"
                    cursor="pointer"
                  />
                </label>
              </Box>

              <FormControl>
                <FormLabel color="white">Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  bg="brand.darkGray"
                  borderColor="brand.lightGray"
                  color="white"
                  _hover={{ borderColor: 'brand.blue' }}
                  _focus={{ borderColor: 'brand.blue' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="white">Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  bg="brand.darkGray"
                  borderColor="brand.lightGray"
                  color="white"
                  _hover={{ borderColor: 'brand.blue' }}
                  _focus={{ borderColor: 'brand.blue' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="white">Bio</FormLabel>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  bg="brand.darkGray"
                  borderColor="brand.lightGray"
                  color="white"
                  _hover={{ borderColor: 'brand.blue' }}
                  _focus={{ borderColor: 'brand.blue' }}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} color="white">
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              loadingText="Saving..."
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
} 