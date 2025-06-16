import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Input,
  Textarea,
  useToast,
  Flex,
  Tooltip,
  Grid,
  GridItem,
  Divider,
  Card,
  CardBody,
  CardHeader,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { 
  FaEdit, 
  FaWallet, 
  FaHistory, 
  FaStar, 
  FaSave, 
  FaTimes, 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaGlobe,
  FaUser,
  FaChartLine,
  FaShoppingBag,
  FaCode,
  FaCamera,
  FaLink,
} from 'react-icons/fa'
import { useState } from 'react'
import AnimatedPage from '../components/AnimatedPage'
import { useAuth } from '../contexts/AuthContext'
import { useUserProfile } from '../contexts/UserProfileContext'
import { EditProfileModal } from '../components/EditProfileModal'
import { UserIPs } from '../components/UserIPs'

const Profile = () => {
  const { address } = useAuth();
  const { profile, loading, updateProfile } = useUserProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const cardBg = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const toast = useToast()

  // State for inline editing
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [bioText, setBioText] = useState(profile?.bio || '')
  const [isEditingSocial, setIsEditingSocial] = useState(false)
  const [socialLinks, setSocialLinks] = useState({
    github: profile?.socialLinks?.github || '',
    twitter: profile?.socialLinks?.twitter || '',
    linkedin: profile?.socialLinks?.linkedin || '',
    website: profile?.socialLinks?.website || '',
  })

  const handleBioSave = async () => {
    try {
      await updateProfile({ bio: bioText })
      setIsEditingBio(false)
      toast({
        title: 'Bio updated',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error updating bio',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleSocialSave = async () => {
    try {
      await updateProfile({ socialLinks })
      setIsEditingSocial(false)
      toast({
        title: 'Social links updated',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error updating social links',
        status: 'error',
        duration: 3000,
      })
    }
  }

  if (!address) {
    return (
      <AnimatedPage>
        <Box minH="100vh" bg="brand.darkGray" pt="80px">
          <Container maxW="container.xl" py={8}>
            <VStack spacing={8} align="center">
              <Heading color="white">Connect Your Wallet</Heading>
              <Text color="brand.lightGray">
                Please connect your wallet to view your profile
              </Text>
            </VStack>
          </Container>
        </Box>
      </AnimatedPage>
    );
  }

  if (loading || !profile) {
    return (
      <AnimatedPage>
        <Box minH="100vh" bg="brand.darkGray" pt="80px">
          <Container maxW="container.xl" py={8}>
            <Text color="white">Loading profile...</Text>
          </Container>
        </Box>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <Box minH="100vh" bg="brand.darkGray" pt="80px">
        <Container maxW="container.xl" py={8}>
          <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
            {/* Left Sidebar */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                {/* Profile Card */}
                <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                  <CardBody>
                    <VStack spacing={4}>
                      <Box position="relative">
                        <Avatar
                          size="2xl"
                          name={profile.name}
                          src={profile.profilePicture}
                          cursor="pointer"
                          onClick={onOpen}
                        />
                        <Tooltip label="Change profile picture">
                          <IconButton
                            aria-label="Edit profile picture"
                            icon={<FaCamera />}
                            position="absolute"
                            bottom="0"
                            right="0"
                            colorScheme="blue"
                            rounded="full"
                            size="sm"
                            onClick={onOpen}
                          />
                        </Tooltip>
                      </Box>
                      <VStack spacing={1}>
                        <Heading size="md" color="white">{profile.name}</Heading>
                        <Text color="brand.lightGray">@{profile.username}</Text>
                      </VStack>
                      <Button
                        leftIcon={<FaEdit />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        onClick={onOpen}
                        w="full"
                      >
                        Edit Profile
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Stats Card */}
                <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                  <CardHeader pb={0}>
                    <Heading size="sm" color="white">Statistics</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Stat>
                        <StatLabel color="brand.lightGray">Total Sales</StatLabel>
                        <StatNumber color="white">{profile.stats.totalSales}</StatNumber>
                        <StatHelpText color="brand.lightGray">Lifetime earnings</StatHelpText>
                      </Stat>
                      <Divider borderColor={borderColor} />
                      <Stat>
                        <StatLabel color="brand.lightGray">Total Purchases</StatLabel>
                        <StatNumber color="white">{profile.stats.totalPurchases}</StatNumber>
                        <StatHelpText color="brand.lightGray">Total spent</StatHelpText>
                      </Stat>
                      <Divider borderColor={borderColor} />
                      <Stat>
                        <StatLabel color="brand.lightGray">Created</StatLabel>
                        <StatNumber color="white">{profile.stats.itemsCreated}</StatNumber>
                        <StatHelpText color="brand.lightGray">Total creations</StatHelpText>
                      </Stat>
                      <Divider borderColor={borderColor} />
                      <Stat>
                        <StatLabel color="brand.lightGray">Sold</StatLabel>
                        <StatNumber color="white">{profile.stats.itemsSold}</StatNumber>
                        <StatHelpText color="brand.lightGray">Total sales</StatHelpText>
                      </Stat>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Quick Actions */}
                <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                  <CardHeader pb={0}>
                    <Heading size="sm" color="white">Quick Actions</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3}>
                      <Button
                        leftIcon={<FaWallet />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        w="full"
                        as="a"
                        href="/marketplace"
                      >
                        Browse Marketplace
                      </Button>
                      <Button
                        leftIcon={<FaHistory />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        w="full"
                        as="a"
                        href="/dashboard"
                      >
                        View Dashboard
                      </Button>
                      <Button
                        leftIcon={<FaStar />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        w="full"
                        as="a"
                        href="/register-ip"
                      >
                        Register New IP
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </GridItem>

            {/* Main Content */}
            <GridItem>
              <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList mb={4}>
                  <Tab color="white">Overview</Tab>
                  <Tab color="white">My IPs</Tab>
                  <Tab color="white">Activity</Tab>
                </TabList>

                <TabPanels>
                  {/* Overview Tab */}
                  <TabPanel p={0}>
                    <VStack spacing={6} align="stretch">
                      {/* Bio Section */}
                      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                        <CardHeader pb={0}>
                          <HStack justify="space-between">
                            <Heading size="sm" color="white">About</Heading>
                            <IconButton
                              aria-label="Edit bio"
                              icon={<FaEdit />}
                              variant="ghost"
                              color="white"
                              size="sm"
                              onClick={() => setIsEditingBio(true)}
                            />
                          </HStack>
                        </CardHeader>
                        <CardBody>
                          {isEditingBio ? (
                            <VStack align="stretch" spacing={2}>
                              <Textarea
                                value={bioText}
                                onChange={(e) => setBioText(e.target.value)}
                                placeholder="Tell us about yourself"
                                bg="brand.darkerGray"
                                borderColor="brand.lightGray"
                                color="white"
                                _hover={{ borderColor: 'brand.blue' }}
                                _focus={{ borderColor: 'brand.blue' }}
                              />
                              <HStack justify="end">
                                <IconButton
                                  aria-label="Cancel"
                                  icon={<FaTimes />}
                                  onClick={() => {
                                    setIsEditingBio(false)
                                    setBioText(profile.bio)
                                  }}
                                  variant="ghost"
                                  color="white"
                                  size="sm"
                                />
                                <IconButton
                                  aria-label="Save"
                                  icon={<FaSave />}
                                  onClick={handleBioSave}
                                  colorScheme="blue"
                                  size="sm"
                                />
                              </HStack>
                            </VStack>
                          ) : (
                            <Text color="white">{profile.bio}</Text>
                          )}
                        </CardBody>
                      </Card>

                      {/* Social Links Section */}
                      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                        <CardHeader pb={0}>
                          <HStack justify="space-between">
                            <Heading size="sm" color="white">Social Links</Heading>
                            <IconButton
                              aria-label="Edit social links"
                              icon={<FaEdit />}
                              variant="ghost"
                              color="white"
                              size="sm"
                              onClick={() => setIsEditingSocial(!isEditingSocial)}
                            />
                          </HStack>
                        </CardHeader>
                        <CardBody>
                          {isEditingSocial ? (
                            <VStack align="stretch" spacing={3}>
                              <Input
                                placeholder="GitHub URL"
                                value={socialLinks.github}
                                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                                leftElement={<FaGithub />}
                                bg="brand.darkerGray"
                                borderColor="brand.lightGray"
                                color="white"
                              />
                              <Input
                                placeholder="Twitter URL"
                                value={socialLinks.twitter}
                                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                                leftElement={<FaTwitter />}
                                bg="brand.darkerGray"
                                borderColor="brand.lightGray"
                                color="white"
                              />
                              <Input
                                placeholder="LinkedIn URL"
                                value={socialLinks.linkedin}
                                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                                leftElement={<FaLinkedin />}
                                bg="brand.darkerGray"
                                borderColor="brand.lightGray"
                                color="white"
                              />
                              <Input
                                placeholder="Website URL"
                                value={socialLinks.website}
                                onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                                leftElement={<FaGlobe />}
                                bg="brand.darkerGray"
                                borderColor="brand.lightGray"
                                color="white"
                              />
                              <HStack justify="end">
                                <IconButton
                                  aria-label="Cancel"
                                  icon={<FaTimes />}
                                  onClick={() => {
                                    setIsEditingSocial(false)
                                    setSocialLinks({
                                      github: profile.socialLinks?.github || '',
                                      twitter: profile.socialLinks?.twitter || '',
                                      linkedin: profile.socialLinks?.linkedin || '',
                                      website: profile.socialLinks?.website || '',
                                    })
                                  }}
                                  variant="ghost"
                                  color="white"
                                  size="sm"
                                />
                                <IconButton
                                  aria-label="Save"
                                  icon={<FaSave />}
                                  onClick={handleSocialSave}
                                  colorScheme="blue"
                                  size="sm"
                                />
                              </HStack>
                            </VStack>
                          ) : (
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                              {socialLinks.github && (
                                <Button
                                  as="a"
                                  href={socialLinks.github}
                                  target="_blank"
                                  leftIcon={<FaGithub />}
                                  variant="ghost"
                                  color="white"
                                  size="sm"
                                  justifyContent="flex-start"
                                >
                                  GitHub
                                </Button>
                              )}
                              {socialLinks.twitter && (
                                <Button
                                  as="a"
                                  href={socialLinks.twitter}
                                  target="_blank"
                                  leftIcon={<FaTwitter />}
                                  variant="ghost"
                                  color="white"
                                  size="sm"
                                  justifyContent="flex-start"
                                >
                                  Twitter
                                </Button>
                              )}
                              {socialLinks.linkedin && (
                                <Button
                                  as="a"
                                  href={socialLinks.linkedin}
                                  target="_blank"
                                  leftIcon={<FaLinkedin />}
                                  variant="ghost"
                                  color="white"
                                  size="sm"
                                  justifyContent="flex-start"
                                >
                                  LinkedIn
                                </Button>
                              )}
                              {socialLinks.website && (
                                <Button
                                  as="a"
                                  href={socialLinks.website}
                                  target="_blank"
                                  leftIcon={<FaGlobe />}
                                  variant="ghost"
                                  color="white"
                                  size="sm"
                                  justifyContent="flex-start"
                                >
                                  Website
                                </Button>
                              )}
                            </SimpleGrid>
                          )}
                        </CardBody>
                      </Card>

                      {/* Badges Section */}
                      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                        <CardHeader pb={0}>
                          <Heading size="sm" color="white">Badges</Heading>
                        </CardHeader>
                        <CardBody>
                          <HStack spacing={3} wrap="wrap">
                            {profile.badges.map((badge, index) => (
                              <Badge
                                key={index}
                                colorScheme={badge.color}
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="sm"
                              >
                                {badge.name}
                              </Badge>
                            ))}
                          </HStack>
                        </CardBody>
                      </Card>
                    </VStack>
                  </TabPanel>

                  {/* My IPs Tab */}
                  <TabPanel p={0}>
                    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                      <CardBody>
                        <UserIPs />
                      </CardBody>
                    </Card>
                  </TabPanel>

                  {/* Activity Tab */}
                  <TabPanel p={0}>
                    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
                      <CardHeader>
                        <Heading size="sm" color="white">Recent Activity</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          <Text color="brand.lightGray" textAlign="center">
                            Activity history will be displayed here
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <EditProfileModal isOpen={isOpen} onClose={onClose} />
    </AnimatedPage>
  )
}

export default Profile 