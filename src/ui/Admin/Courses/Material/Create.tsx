import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../Components/BackButton';
import { Header } from '../../Components/Header';
import { Sidebar } from '../../Components/Sidebar';

export const CreateCourseMaterialAdmin = () => {
  const {id} = useParams();
  const [filesInput, setFilesInput] = useState<any[]>([])
  const [files, setFiles] = useState<string[]>([])
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (profile && userState) {
      if (userState.isLoggedIn && profile.role === "admin") {
        dispatch(userProfile() as any);
      } else if (profile.role === "user") {
        window.location.href = "/";
      } else if (!userState.isLoggedIn) {
        window.location.href = "/";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.isLoggedIn, dispatch]);

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
    
    request.open('POST', `${Constants.API_URL}courses/${id}/material`);
    request.setRequestHeader("Bearer", `${userState.data?.access_token}`)
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
