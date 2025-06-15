export const TOMO_CONFIG = {
    clientId: 'foagCugAzwQrEyWjETM3x0VTAtp1YG9ZL6blI6c5rDZEGnfQxJripV1vkxxmS3nzVVGNHoDieV8NbAPlXlbNnrDj',
    projectId: 'a6fe50d71ddcd662f68ae2708132b51f',
    metadata: {
        name: 'Sellene',
        description: 'Sellene - IP Tokenization Platform',
        url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        icons: ['https://assets.reown.com/reown-profile-pic.png']
    },
    allowedDomains: [
        'http://localhost:3000',
        'http://localhost:5173', // Vite default port
        'https://d0d6-2409-40d1-2014-9fe7-7974-a6f8-9dd0-c112.ngrok-free.app'
    ],
    chains: {
        mainnet: {
            chainId: 1,
            name: 'Ethereum Mainnet',
            rpcUrl: 'https://mainnet.infura.io/v3/your-infura-key'
        },
        sepolia: {
            chainId: 11155111,
            name: 'Sepolia Testnet',
            rpcUrl: 'https://sepolia.infura.io/v3/your-infura-key'
        }
    }
}; 