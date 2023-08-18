import React, { useState } from 'react'
import { Input, Button, FormControl, FormLabel, VStack } from '@chakra-ui/react'
import { useAddress, useContract, useContractWrite } from '@thirdweb-dev/react'

export const ProposeForm: React.FC = () => {
  const [title, setTitle] = useState('')

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const address = useAddress()
  const { mutateAsync: propose, isLoading } = useContractWrite(contract, 'propose')

  const onSubmit = async (title: string) => {
    try {
      const data = await propose({ args: [[address], [address], [address], title] })
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (title.trim() !== '') {
      onSubmit(title)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align='stretch'>
        <FormControl>
          <FormLabel>タイトル：</FormLabel>
          <Input
            type='text'
            value={title}
            onChange={handleTitleChange}
            placeholder='タイトルを入力してください'
          />
        </FormControl>
        <Button type='submit' colorScheme='blue'>
          送信
        </Button>
      </VStack>
    </form>
  )
}
