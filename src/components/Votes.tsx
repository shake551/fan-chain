import React from 'react';
import { Proposal, ProposalState } from '@thirdweb-dev/sdk';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { Box, Flex } from '@chakra-ui/react';
import { VoteCard } from './card/VoteCard';

interface VotesProps {
  targetState: ProposalState; 
}

export function Votes({ targetState }: VotesProps) { 
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { data: proposals, isLoading } = useContractRead(contract, 'getAllProposals')

  return (
    <div>
      <h1>Vote Proposals</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Flex direction='row' flexWrap='wrap' width='1500px'> {/* 全体の幅を一定に保つ */}
          {proposals?.map((proposal: Proposal, i: number) => (
            <Box
              key={i}
              width='300px' // 各カードの幅を一定に設定
              margin='30px' // カードの間隔
            >
              <VoteCard proposal={proposal} targetState={targetState} />
            </Box>
          ))}
        </Flex>
      )}
    </div>
  )
}
