import Constants from "@/application/common/Constants";
import axios from "axios";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { Box, Flex, HStack, VStack, Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { BackButton } from "../Components/BackButton";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export const EditLocationAdmin = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
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

    useEffect(() => {
        axios.get(`${Constants.API_URL}courses/locations/${id}`).then(res => {
            setName(res.data.name);
        })
    }, [])

    function handleUpdateLocation(e: any) {
        e.preventDefault();

        axios.patch(`${Constants.API_URL}courses/locations/${id}`, {
            name: name
        }, {
            headers: {
                'Bearer': `${userState.data?.access_token}`
              }
        }).then(res => {
            toast.success('Localização editada!', {
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
              toast.error('Erro ao editar localização!', {
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
                <Text fontSize={"2xl"}>Editar localização</Text>
              </Box>
              <VStack as="form" spacing={6} onSubmit={(e) => { handleUpdateLocation(e) }}>
                <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                  <FormControl isRequired>
                    <FormLabel>Localização</FormLabel>
                    <Input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                  </FormControl>
                </Box>

                <Button
                  type='submit'
                  colorScheme="blue"
                  w={"full"}
                  size={"lg"}
                >Editar localização</Button>
              </VStack>
            </Box>
          </Box>
          <ToastContainer />
        </Flex>
      )
}