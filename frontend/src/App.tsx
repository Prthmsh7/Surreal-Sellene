import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import theme from './theme'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import { StoryProvider } from './contexts/StoryContext'
import { DeBridgeProvider } from './contexts/DeBridgeContext'
import { UserProfileProvider } from './contexts/UserProfileContext'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
import { config } from './config/wagmi'
import { Spinner, Center } from '@chakra-ui/react'

// Lazy load components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const Developers = lazy(() => import('./pages/Developers'))
const Profile = lazy(() => import('./pages/Profile'))
const StoryIPRegistration = lazy(() => import('./components/StoryIPRegistration'))
const SecureAuth = lazy(() => import('./components/SecureAuth'))
const DeBridgeTestPage = lazy(() => import('./pages/DeBridgeTestPage'))
const DashboardLayout = lazy(() => import('./components/DashboardLayout'))
const Overview = lazy(() => import('./pages/Overview'))
const Geography = lazy(() => import('./pages/Geography'))
const Monthly = lazy(() => import('./pages/Monthly'))
const Breakdown = lazy(() => import('./pages/Breakdown'))
const Daily = lazy(() => import('./pages/Daily'))

// Loading component
const LoadingSpinner = () => (
  <Center h="100vh">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.blue"
      size="xl"
    />
  </Center>
)

// Configure React Router future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <AuthProvider>
          <StoryProvider>
            <DeBridgeProvider>
              <UserProfileProvider>
                <Router future={router.future}>
                  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                      <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                          {/* Public Routes */}
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/marketplace" element={<Marketplace />} />
                          <Route path="/developers" element={<Developers />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/register-ip" element={<StoryIPRegistration />} />
                          <Route path="/auth" element={<SecureAuth />} />
                          <Route path="/debridge-test" element={<DeBridgeTestPage />} />

                          {/* Dashboard Routes */}
                          <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Navigate to="/dashboard/overview" replace />} />
                            <Route path="overview" element={<Overview />} />
                            <Route path="geography" element={<Geography />} />
                            <Route path="monthly" element={<Monthly />} />
                            <Route path="breakdown" element={<Breakdown />} />
                            <Route path="daily" element={<Daily />} />
                          </Route>

                          {/* Redirects */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <Toaster position="bottom-right" />
                  </div>
                </Router>
              </UserProfileProvider>
            </DeBridgeProvider>
          </StoryProvider>
        </AuthProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default App
