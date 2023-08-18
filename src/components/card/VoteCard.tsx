import { useState } from 'react'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Progress,
  Text,
} from '@chakra-ui/react'
import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { Proposal, ProposalState } from '@thirdweb-dev/sdk'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { VoteCardDetails } from './VoteCardDetails'
import { VoteButton } from '../button/VoteButton'

interface Props {
  proposal: Proposal
  targetState: ProposalState
}

export function VoteCard({ proposal, targetState }: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const { data: voteState } = useContractRead(contract, 'proposalVotes', [proposal.proposalId])

  // Calculate total votes
  const totalVotes = voteState
    ? Number(voteState[0]) + Number(voteState[1]) + Number(voteState[2])
    : 0

  // Calculate percentages
  const forPercentage = totalVotes ? (Number(voteState[1]) / totalVotes) * 100 : 0
  const againstPercentage = totalVotes ? (Number(voteState[0]) / totalVotes) * 100 : 0
  const abstainPercentage = totalVotes ? (Number(voteState[2]) / totalVotes) * 100 : 0

  const { data: state } = useContractRead(contract, 'state', [proposal.proposalId])

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
              <Text fontSize='sm' textAlign='end'>
                {forPercentage.toFixed(2)}%
              </Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Against:</Text>
              <Progress value={againstPercentage} size='sm' colorScheme='red' />
              <Text fontSize='sm' textAlign='end'>
                {againstPercentage.toFixed(2)}%
              </Text>
            </Box>
            <Box>
              <Text fontWeight='bold'>Abstain:</Text>
              <Progress value={abstainPercentage} size='sm' colorScheme='blue' />
              <Text fontSize='sm' textAlign='end'>
                {abstainPercentage.toFixed(2)}%
              </Text>
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
      </CardBody>
    </Card>
  )
}
