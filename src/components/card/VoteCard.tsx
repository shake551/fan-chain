import { ProposalStateName } from '@/utils/proposalState'
import { Box, Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { Proposal, ProposalState } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

interface Props {
  proposal: Proposal
}

export function VoteCard({ proposal }: Props) {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const { data: voteState, isLoading: voteStateLoading } = useContractRead(
    contract,
    'proposalVotes',
    [proposal.proposalId],
  )
  const { data: state, isLoading: stateLoading } = useContractRead(contract, 'state', [
    proposal.proposalId,
  ])
  const stateName = ProposalStateName(state)

  return (
    <Card backgroundColor='white' boxShadow='md' borderRadius='md' p={4} m={4}>
      <CardHeader>
        <Heading size='md' color='teal.500' mb={2}>
          {proposal.description}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          <Box>
            <Text fontWeight='bold'>Proposer:</Text>
            <Text fontSize='sm'>{proposal.proposer}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>State:</Text>
            <Text fontSize='sm'>{stateName}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Start Block Number:</Text>
            <Text fontSize='sm'>{Number(proposal.startBlock)}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>End Block Number:</Text>
            <Text fontSize='sm'>{Number(proposal.endBlock)}</Text>
          </Box>
          {voteState && (
            <>
              <Box>
                <Text fontWeight='bold'>For:</Text>
                <Text fontSize='sm'>{ethers.utils.formatUnits(`${Number(voteState[1])}`, 18)}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Against:</Text>
                <Text fontSize='sm'>{ethers.utils.formatUnits(`${Number(voteState[0])}`, 18)}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Abstain:</Text>
                <Text fontSize='sm'>{ethers.utils.formatUnits(`${Number(voteState[2])}`, 18)}</Text>
              </Box>
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}
