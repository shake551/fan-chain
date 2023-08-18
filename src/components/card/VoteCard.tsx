import { ProposalStateName } from '@/utils/proposalState'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { Proposal, ProposalState } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

interface Props {
  proposal: Proposal
}

export function VoteCard({ proposal }: Props) {
  console.log(proposal.proposalId)
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
    <Card backgroundColor='grey' m={5}>
      <CardHeader>
        <Heading size='md'>{proposal.description}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs'>Proposer</Heading>
            <Text pt='2' fontSize='sm'>
              {proposal.proposer}
            </Text>
          </Box>
          <Box>
            <Heading size='xs'>State</Heading>
            <Text pt='2' fontSize='sm'>
              {stateName}
            </Text>
          </Box>
          <Box>
            <Heading size='xs'>Start Block Number</Heading>
            <Text pt='2' fontSize='sm'>
              {Number(proposal.startBlock)}
            </Text>
          </Box>
          <Box>
            <Heading size='xs'>End Block Number</Heading>
            <Text pt='2' fontSize='sm'>
              {Number(proposal.endBlock)}
            </Text>
          </Box>
          {voteState ? (
            <>
              <Box>
                <Heading size='xs'>For</Heading>
                <Text pt='2' fontSize='sm'>
                  {ethers.utils.formatUnits(`${Number(voteState[1])}`, 18)}
                </Text>
              </Box>
              <Box>
                <Heading size='xs'>Against</Heading>
                <Text pt='2' fontSize='sm'>
                  {ethers.utils.formatUnits(`${Number(voteState[0])}`, 18)}
                </Text>
              </Box>
              <Box>
                <Heading size='xs'>Abstain</Heading>
                <Text pt='2' fontSize='sm'>
                  {ethers.utils.formatUnits(`${Number(voteState[2])}`, 18)}
                </Text>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}
