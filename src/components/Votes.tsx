import React from 'react';
import { Proposal, ProposalState } from '@thirdweb-dev/sdk';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { Box, Flex, Badge, Divider } from '@chakra-ui/react';
import { VoteCard } from './card/VoteCard';
import { ProposalStateName } from '@/utils/proposalState';

interface VotesProps {
  targetState: ProposalState; 
}

export function Votes({ targetState }: VotesProps) { 
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { data: proposals, isLoading } = useContractRead(contract, 'getAllProposals')

  return (
    <div>
      
      <Divider marginBottom='20px' borderColor='black'/> {/* 横線のカラーを指定 */}
      <Flex alignItems='flex-end' marginBottom='10px'>
        <Badge
          colorScheme='gray'
          fontSize='sm'
          p={2}
          borderRadius='md'
          boxShadow='md'
          bg='gray.100'
        >
          {ProposalStateName(targetState)}
        </Badge>
      </Flex>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Flex direction='row' flexWrap='wrap' width='1500px'>
          {proposals?.map((proposal: Proposal, i: number) => (
            <Box
              key={i}
              width='300px'
              margin='30px'
            >
              <VoteCard proposal={proposal} targetState={targetState} />
            </Box>
          ))}
        </Flex>
      )}
    </div>
  )
}
