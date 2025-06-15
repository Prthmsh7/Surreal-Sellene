import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'

const projectId = 'YOUR_PROJECT_ID'

const metadata = {
  name: 'Surreal IP Registry',
  description: 'Surreal IP Registry dApp',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [sepolia]
const sepoliaRpcUrl = 'https://sepolia.infura.io/v3/be30aa58a76d49c4a3c9a06d303e486d'

const wagmiConfig = createConfig({
  chains,
  transports: {
    [sepolia.id]: http(sepoliaRpcUrl)
  },
  ssr: false,
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
)
