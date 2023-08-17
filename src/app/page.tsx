'use client'

import { Votes } from '@/components/Votes'
import { ThirdwebProvider, ConnectWallet, metamaskWallet } from '@thirdweb-dev/react'

export default function App() {
  return (
    <ThirdwebProvider
      activeChain='mumbai'
      clientId='ff9630612d3e1f52ee79a7cd92bd656e'
      supportedWallets={[metamaskWallet()]}
    >
      <ConnectWallet />
      <Votes />
    </ThirdwebProvider>
  )
}
