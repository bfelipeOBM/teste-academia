import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { Box, Flex, HStack, VStack, Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { BackButton } from "../Components/BackButton";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";

export const CreateLocationAdmin = () => {
    const [name, setName] = useState('');
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

    const handleCreateLocation = (e: any) => {
        e.preventDefault();
        axios.post(`${Constants.API_URL}courses/locations`, {name: name}, {
            headers: {
                'Bearer': `${userState.data?.access_token}`
              }
        }).then((response) => {
            toast.success('Localização criada!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            });
            setTimeout(() => {
              window.location.href = "/admin/locations";
            }, 2000)
          }).catch((error) => {
            toast.error('Erro ao criar localização!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            });
          })
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
            <Box w="100%" maxW={1120} mx="auto" px={8}>
              <Box py={8}>
                <Text fontSize={"2xl"}>Criar localização</Text>
              </Box>
              <VStack as="form" spacing={6} onSubmit={(e) => { handleCreateLocation(e) }}>
                <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                  <FormControl isRequired>
                    <FormLabel>Localização</FormLabel>
                    <Input type="text" onChange={(e) => setName(e.target.value)} />
                  </FormControl>
                </Box>
                
                <Button
                  type='submit'
                  colorScheme="green"
                  w={"full"}
                  size={"lg"}
                >Criar localização</Button>
              </VStack>
            </Box>
          </Box>
          <ToastContainer />
        </Flex>
      )
    }