import Constants from '@/application/common/Constants';
import { Flex, HStack, Button, IconButton, Box, Text, FormControl, FormLabel, Input, VStack, Select, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper } from '@chakra-ui/react'
import axios from 'axios';
import { ArrowLeft, } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../Components/BackButton';
import { Header } from '../../Components/Header';
import { Sidebar } from '../../Components/Sidebar';

export const CreateCourseMaterialAdmin = () => {
  const {id} = useParams();
  const [filesInput, setFilesInput] = useState<any[]>([])
  const [files, setFiles] = useState<string[]>([])

  function handleAddFile(e: any) { 
    setFiles(previouState => [...previouState, e.target.files[0]])
  }

  function handleAddFileInput(e: any) {
    e.preventDefault();
    
    setFilesInput([...filesInput, 
      <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"} key={filesInput.length}>
        <FormControl>
          <FormLabel>Material {filesInput.length + 1}</FormLabel>
          <Input type="file" name={`file-${filesInput.length}`} onChange={(handleAddFile)} required/>
        </FormControl>
      </Box>
    ])
  }

  function handleCreateCourseMaterial(e: any) {
    e.preventDefault();
    const form = new FormData();
    files.forEach((file, index) => {
      form.append(`file-${index}`, file);
    })
    let request = new XMLHttpRequest();
    
    request.open('POST', `${Constants.API_URL}/courses/${id}/material`);
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
            <Text fontSize={"2xl"}>Adicionar material para o curso e todas as turmas</Text>
          </Box>
          <VStack as="form" spacing={6}>
            {filesInput}
           <Button onClick={handleAddFileInput} >Adicionar outro material</Button>
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleCreateCourseMaterial(e)}}
            >Criar turma</Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
