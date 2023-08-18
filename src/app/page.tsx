'use client'

import { Votes } from '@/components/Votes'
import { ProposeForm } from '@/components/form/ProposeForm'
import { ThirdwebProvider, ConnectWallet, metamaskWallet } from '@thirdweb-dev/react'

export default function App() {
  return (
    <ThirdwebProvider
      activeChain='mumbai'
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedWallets={[metamaskWallet()]}
    >
      <ConnectWallet />
      <ProposeForm />
      <Votes />
    </ThirdwebProvider>
  )
}
