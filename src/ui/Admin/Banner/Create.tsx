import Constants from '@/application/common/Constants';
import { Flex, HStack, Button, IconButton, AspectRatio, Heading, Box, Image, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Select, useRadioGroup, Grid } from '@chakra-ui/react'
import axios from 'axios';
import { ArrowLeft, Plus } from 'phosphor-react';
import { useState } from 'react';
import { BackButton } from '../Components/BackButton';
import { Header } from '../Components/Header';
import { Sidebar } from '../Components/Sidebar';

export const CreateBannerAdmin = () => {
  const [image, setImage] = useState("")

  function handleAddImage(e: any) {
    setImage(e.target.files[0])
  }

  function handleCreateCourse(e: any) {
    e.preventDefault()
    
    const form = new FormData();
    form.append("file", image);

    let request = new XMLHttpRequest();
    request.open('POST', `${Constants.API_URL}/banners`);
    request.setRequestHeader("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlJhbmRvbSBuYW1lIiwiZXhwIjoxNjY1OTQyNjk0LCJyb2xlIjoiYWRtaW4ifQ.5tB5v5Pg9Bt0PZDLVxhnHpW6fAb2Te6DS-gRyEA8xjc")
    request.send(form);
  }


  return (
    <Flex w="100%">
      <Sidebar />
      <Box w="100%">
        <Header>
        <HStack justifyContent="space-between">
          <BackButton />
        </HStack>
        </Header>
        
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Adicionar banner</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Banner (apenas PNG, GIF, JPEG e JPG)</FormLabel>
                <Input type="file" name="file" onChange={(e) => handleAddImage(e)} required accept="image/png, image/gif, image/jpeg, image/jpg "/>
              </FormControl>
            </Box>
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleCreateCourse(e)}}
            >Adicionar banner</Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
