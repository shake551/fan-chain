import React from 'react';
import {
  Box,
  Heading,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Proposal } from '@thirdweb-dev/sdk';
import { CloseIcon } from '@chakra-ui/icons';

interface Props {
  proposal: Proposal;
  onClose: () => void;
}

export function VoteCardDetails({ proposal, onClose }: Props) {
  return (
    <Box
      position='fixed'
      top='0'
      right='0'
      width='300px'
      height='100%'
      backgroundColor='rgba(0, 0, 0, 0.2)' // 透明のグレーに設定
      backdropFilter='blur(5px)' // ブラー効果を追加
      boxShadow='md'
      p={4}
      zIndex={9999}
    >
      <IconButton
        icon={<CloseIcon />}
        aria-label='Close'
        onClick={onClose}
        position='absolute'
        top='8px'
        right='8px'
      />
      <Heading size='md' color='teal.500' mb={2}>
        {proposal.description}
      </Heading>
      <Stack spacing={2}>
        <Box>
          <Text fontWeight='bold'>Proposer:</Text>
          <Text fontSize='sm'>{proposal.proposer}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Start Block Number:</Text>
          <Text fontSize='sm'>{Number(proposal.startBlock)}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>End Block Number:</Text>
          <Text fontSize='sm'>{Number(proposal.endBlock)}</Text>
        </Box>
      </Stack>
    </Box>
  );
}
