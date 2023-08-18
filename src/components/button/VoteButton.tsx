import React from 'react'
import { Button } from '@chakra-ui/react'

interface VoteButtonProps {
  onClick: () => void
  label: string
  color: string
}

export const VoteButton: React.FC<VoteButtonProps> = ({ onClick, label, color }) => {
  return (
    <Button m={5} onClick={onClick} colorScheme={color}>
      {label}
    </Button>
  )
}
