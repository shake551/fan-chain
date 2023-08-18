import React from 'react'
import { Proposal, useContract, useContractRead } from '@thirdweb-dev/react'
import { VoteCard } from './card/VoteCard'
import { Flex, Wrap } from '@chakra-ui/react'

export function Votes() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { data: proposals, isLoading } = useContractRead(contract, 'getAllProposals')

  return (
    <div>
      <h1>Vote Proposals</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Flex>
          <Wrap>
            {proposals?.map((proposal: Proposal, i: number) => (
              <div key={i}>
                <VoteCard proposal={proposal} />
              </div>
            ))}
          </Wrap>
        </Flex>
      )}
    </div>
  )
}
