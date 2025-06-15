import React from 'react'
import { useAccount } from 'wagmi'
import RegisterIP from './components/RegisterIP'
import IPList from './components/IPList'
import Recommendations from './components/Recommendations'

function App() {
  const { address, isConnected } = useAccount()
  const [ips, setIps] = React.useState(() => {
    const saved = localStorage.getItem('ips')
    return saved ? JSON.parse(saved) : []
  })

  const handleRegister = (newIp) => {
    const ipWithMeta = {
      ...newIp,
      owner: address,
      date: new Date().toLocaleDateString()
    }
    const updatedIps = [...ips, ipWithMeta]
    setIps(updatedIps)
    localStorage.setItem('ips', JSON.stringify(updatedIps))
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>Surreal IP Registry</h1>
      <w3m-button />
      {isConnected ? (
        <>
          <div style={{ margin: '16px 0', color: 'gray' }}>
            Connected as: <b>{address}</b>
          </div>
          <RegisterIP onRegister={handleRegister} />
          <IPList ips={ips} />
          <Recommendations />
        </>
      ) : (
        <div style={{ marginTop: 24, color: 'red' }}>
          Please connect your wallet to continue.
        </div>
      )}
    </div>
  )
}

export default App
