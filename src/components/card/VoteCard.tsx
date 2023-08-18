import { ProposalStateName } from '@/utils/proposalState'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { Proposal, ProposalState } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import { VoteButton } from '../button/VoteButton'

interface Props {
  proposal: Proposal
  targetState: ProposalState
}

export function VoteCard({ proposal, targetState }: Props) {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const { data: voteState } = useContractRead(
    contract,
    'proposalVotes',
    [proposal.proposalId],
  )
  const { data: state } = useContractRead(contract, 'state', [
    proposal.proposalId,
  ])

  const stateName = ProposalStateName(state)

  const { mutateAsync: castVote } = useContractWrite(contract, 'castVote')
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

  const address = useAddress()
  const { data: hasVoted } = useContractRead(contract, 'hasVoted', [proposal.proposalId, address])

  if (state != targetState) {
  return
  }

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
          {state == ProposalState.Active && !hasVoted ? (
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
          {hasVoted ? <Text>Voted</Text> : <></>}
        </Stack>
      </CardBody>
    </Card>
  )
}
