import { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { Proposal, ProposalState } from '@thirdweb-dev/sdk';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { VoteCardDetails } from './VoteCardDetails';

interface Props {
  proposal: Proposal;
  targetState: ProposalState; 
}

export function VoteCard({ proposal }: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: voteState, isLoading: voteStateLoading } = useContractRead(
    contract,
    'proposalVotes',
    [proposal.proposalId]
  );

  // Calculate total votes
  const totalVotes = voteState
    ? Number(voteState[0]) + Number(voteState[1]) + Number(voteState[2])
    : 0;

  // Calculate percentages
  const forPercentage = totalVotes ? (Number(voteState[1]) / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes ? (Number(voteState[0]) / totalVotes) * 100 : 0;
  const abstainPercentage = totalVotes ? (Number(voteState[2]) / totalVotes) * 100 : 0;

  return (
    <Card backgroundColor='white' boxShadow='md' borderRadius='md' p={4} m={4}>
      <CardHeader>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Heading size='md' color='teal.500' mb={2}>
            {proposal.description}
          </Heading>
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={() => setIsDetailsOpen(true)}
            aria-label='Toggle Details'
            size='sm'
          />
        </Box>
      </CardHeader>
      <CardBody>
        {isDetailsOpen && (
          <VoteCardDetails proposal={proposal} onClose={() => setIsDetailsOpen(false)} />
        )}
        {voteState && (
          <>
            <Box>
              <Text fontWeight='bold'>For:</Text>
              <Progress value={forPercentage} size='sm' colorScheme='green' />
              <Text fontSize='sm' textAlign='end'>{forPercentage.toFixed(2)}%</Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Against:</Text>
              <Progress value={againstPercentage} size='sm' colorScheme='red' />
              <Text fontSize='sm' textAlign='end'>{againstPercentage.toFixed(2)}%</Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Abstain:</Text>
              <Progress value={abstainPercentage} size='sm' colorScheme='blue' />
              <Text fontSize='sm' textAlign='end'>{abstainPercentage.toFixed(2)}%</Text>
            </Box>
          </>
        )}
      </CardBody>
    </Card>
  );
}
