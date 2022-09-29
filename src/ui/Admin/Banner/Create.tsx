import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '../Components/BackButton';
import { Header } from '../Components/Header';
import { Sidebar } from '../Components/Sidebar';


export const CreateBannerAdmin = () => {
  const [image, setImage] = useState("")
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

  function handleAddImage(e: any) {
    setImage(e.target.files[0])
  }

  function handleCreateCourse(e: any) {
    e.preventDefault()

    const form = new FormData();
    form.append("file", image);

    let request = new XMLHttpRequest();
    request.open('POST', `${Constants.API_URL}banners`);
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
            <Text fontSize={"2xl"}>Adicionar banner</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Banner (apenas PNG, GIF, JPEG e JPG)</FormLabel>
                <Input type="file" name="file" onChange={(e) => handleAddImage(e)} required />
              </FormControl>
            </Box>
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => { handleCreateCourse(e) }}
            >Adicionar banner</Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
