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
import { Proposal } from '@thirdweb-dev/sdk'

interface Props {
  proposal: Proposal
}

export function VoteCard({ proposal }: Props) {
  console.log(proposal.executions)
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
              {proposal.state}
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
        </Stack>
      </CardBody>
    </Card>
  )
}
