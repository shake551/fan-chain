'use client'

import { Votes } from '@/components/Votes'
import { ProposeForm } from '@/components/form/ProposeForm'
import { ThirdwebProvider, ConnectWallet, metamaskWallet, ProposalState } from '@thirdweb-dev/react'

export default function App() {
  return (
    <ThirdwebProvider
      activeChain='aster'
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedWallets={[metamaskWallet()]}
    >
      <ConnectWallet />
      <ProposeForm />
      <Votes targetState={ProposalState.Active} />
      <Votes targetState={ProposalState.Succeeded} />
      <Votes targetState={ProposalState.Executed} />
      <Votes targetState={ProposalState.Expired} />
      <Votes targetState={ProposalState.Defeated} />
      <Votes targetState={ProposalState.Pending} />
      <Votes targetState={ProposalState.Queued} />
      <Votes targetState={ProposalState.Canceled} />
    </ThirdwebProvider>
  )
}
