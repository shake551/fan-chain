import React from 'react'
import { Proposal, ProposalState } from '@thirdweb-dev/sdk' // 必要なSDKのインポートを追加
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { VoteCard } from './card/VoteCard'
import { Box, Flex } from '@chakra-ui/react'

interface VotesProps {
  targetState: ProposalState
}

export function Votes({ targetState }: VotesProps) {
  // VotesPropsを指定
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { data: proposals, isLoading } = useContractRead(contract, 'getAllProposals')

  return (
    <div>
      <h1>Vote Proposals</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Flex direction={['column', 'row']} flexWrap='wrap'>
          {proposals?.map((proposal: Proposal, i: number) => (
            <Box key={i} flex='1' minWidth='300px' marginRight='24px' marginBottom='24px'>
              <VoteCard proposal={proposal} targetState={targetState} />
            </Box>
          ))}
        </Flex>
      )}
    </div>
  )
}
