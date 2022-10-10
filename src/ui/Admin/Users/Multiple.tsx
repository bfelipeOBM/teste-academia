import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from '../Components/BackButton';
import { Header } from '../Components/Header';
import { Sidebar } from '../Components/Sidebar';


export const UsersAdminMultiple = () => {
  const [file, setFile] = useState("")
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (userState.isLoggedIn) {
      dispatch(userProfile() as any);
      if (profile.role !== "admin") {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  }, [userState.isLoggedIn, dispatch]);

  function handleAddFile(e: any) {
    setFile(e.target.files[0])
  }

  function handleCreateMultipleUsers(e: any) {
    e.preventDefault()
    
    const form = new FormData();
    form.append("file", file);

    let request = new XMLHttpRequest();
    request.open('POST', `${Constants.API_URL}users/multiple`);
    request.setRequestHeader("Bearer", `${userState.data?.access_token}`)
    request.send(form);
  }


  return (
    <Flex w="100%" flexDir={['column', 'row']}>
      <Sidebar />
      <Box w="100%">
        <Header>
        <HStack justifyContent="space-between">
          <BackButton />
        </HStack>
        </Header>
        
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Adicionar mútliplos usuários</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Arquivo (Apenas CSV)</FormLabel>
                <Input type="file" name="file" onChange={(e) => handleAddFile(e)} required accept=".csv"/>
              </FormControl>
            </Box>
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleCreateMultipleUsers(e)}}
            >Fazer upload</Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
