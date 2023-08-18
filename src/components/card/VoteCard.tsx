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
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { Proposal, ProposalState } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import { VoteButton } from '../button/VoteButton'

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

  const { mutateAsync: castVote, isLoading } = useContractWrite(contract, 'castVote')
  const callFor = async (proposalId: string) => {
    try {
      const data = await castVote({ args: [proposalId, 1] })
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }

  const callAgainst = async (proposalId: string) => {
    try {
      const data = await castVote({ args: [proposalId, 0] })
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }

  const callAbstained = async (proposalId: string) => {
    try {
      const data = await castVote({ args: [proposalId, 2] })
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }

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
          {state == ProposalState.Active ? (
            <>
              <VoteButton
                label='For'
                onClick={() => callFor(`${proposal.proposalId}`)}
                color='green'
              />
              <VoteButton
                label='Against'
                onClick={() => callAgainst(`${proposal.proposalId}`)}
                color='red'
              />
              <VoteButton
                label='Abstain'
                onClick={() => callAbstained(`${proposal.proposalId}`)}
                color='gray'
              />
            </>
          ) : (
            <></>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}
