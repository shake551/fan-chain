'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react'

export default function App() {
  return (
    <Flex direction='row' flexWrap='wrap' width='1500px'>
      <Box>
        <Card backgroundColor='white' boxShadow='md' borderRadius='md' p={4} m={4} w={300}>
          <CardHeader>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Heading size='md' color='teal.500' mb={2}>
                次の応援歌
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <Box>
              <Text fontWeight='bold'>Deadline:</Text>
              <Text fontSize='sm' textAlign='end'>
                2023/08/21
              </Text>
            </Box>
            <Center>
              <Button
                onClick={() => {
                  window.location.href = '/contents/1'
                }}
                colorScheme='teal'
              >
                Detail
              </Button>
            </Center>
          </CardBody>
        </Card>
      </Box>
      <Box>
        <Card backgroundColor='white' boxShadow='md' borderRadius='md' p={4} m={4} w={300}>
          <CardHeader>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Heading size='md' color='teal.500' mb={2}>
                ハーフタイムのコンテンツ
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <Box>
              <Text fontWeight='bold'>Deadline:</Text>
              <Text fontSize='sm' textAlign='end'>
                2023/08/30
              </Text>
            </Box>
            <Center>
              <Button
                onClick={() => {
                  window.location.href = '/contents/1'
                }}
                colorScheme='teal'
              >
                Detail
              </Button>
            </Center>
          </CardBody>
        </Card>
      </Box>
      <Box>
        <Card backgroundColor='white' boxShadow='md' borderRadius='md' p={4} m={4} w={300}>
          <CardHeader>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Heading size='md' color='teal.500' mb={2}>
                新しいスタメシ
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <Box>
              <Text fontWeight='bold'>Deadline:</Text>
              <Text fontSize='sm' textAlign='end'>
                2023/08/31
              </Text>
            </Box>
            <Center>
              <Button
                onClick={() => {
                  window.location.href = '/contents/1'
                }}
                colorScheme='teal'
              >
                Detail
              </Button>
            </Center>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  )
}
