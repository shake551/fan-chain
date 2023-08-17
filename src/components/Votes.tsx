import React from 'react'
import { Proposal, useContract, useContractRead } from '@thirdweb-dev/react'
import { VoteCard } from './card/VoteCard'
import { Stack } from '@chakra-ui/react'

export function Votes() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { data: proposals, isLoading } = useContractRead(contract, 'getAllProposals')

  return (
    <div>
      <h1>Vote Proposals</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Stack direction={['column', 'row']} spacing='24px'>
          {proposals?.map((proposal: Proposal, i: number) => (
            <div key={i}>
              <VoteCard proposal={proposal} />
            </div>
          ))}
        </Stack>
      )}
    </div>
  )
}
