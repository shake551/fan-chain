import React, { useState } from 'react';
import { Input, Button, FormControl, FormLabel, HStack } from '@chakra-ui/react';
import { useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';

export const ProposeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();
  const { mutateAsync: propose, isLoading } = useContractWrite(contract, 'propose');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = async (title: string) => {
    try {
      const data = await propose({ args: [[address], [address], [address], title] });
      console.info('contract call success', data);
    } catch (err) {
      console.error('contract call failure', err);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() !== '') {
      onSubmit(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack spacing={4} align='flex-end'>
        <FormControl width='35%'>
          <FormLabel fontSize='xl' fontWeight='bold'>
            タイトル：
          </FormLabel>
          <Input
            type='text'
            value={title}
            onChange={handleTitleChange}
            placeholder='タイトルを入力してください'
            size='lg' 
          />
        </FormControl>
        <Button type='submit' colorScheme='teal' size='lg' isLoading={isLoading}>
          送信
        </Button>
      </HStack>
    </form>
  );
};
