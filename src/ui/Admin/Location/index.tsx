import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { Box, Button, Grid, GridItem, Image, Heading, HStack, Text, VStack, IconButton, AspectRatio, Tooltip, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, Input, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react"
import axios from "axios"
import { PencilLine, Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { User } from "../interface/user";
import 'react-toastify/dist/ReactToastify.css';

interface Location {
    id: number;
    name: string;
}

export const LocationAdminInfos = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/locations`, {
        headers: {
          'Bearer': `${userState.data?.access_token}`
        }
      }).then(res => {
        setLocations(res.data);
      }).catch((error) => {
        toast.error('Erro exibir todas as localizações!', {
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
  }, [])

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

  return (
    <Flex w={"100%"} flexDir={['column', 'row']}>
      <Sidebar />
      <VStack w="100%" bg={"gray.100"}>
        <Header>
          <HStack justifyContent="space-between" flexDir={['column', 'row']}>
            <Heading>Localizações</Heading>
            <HStack spacing={6}>
              <Button
                as={Link}
                to="/admin/locations/create"
                colorScheme="green"
                size={"lg"}
                leftIcon={<Plus />}>
                Adicionar uma localização
              </Button>
            </HStack>
          </HStack>
        </Header>
        <Box as="main" w={"100%"} maxW={1120} mx="auto" px={8}>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Localização</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {locations.map(location => (
                            <Tr key={location.id}>
                                <Td><Heading size="md">{location.name}</Heading></Td>
                                <Td>
                                    <Link to={`/admin/locations/${location.id}/edit`}>
                                        <Button colorScheme="blue" leftIcon={<PencilLine />}>Editar</Button>
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
      </VStack>
      <ToastContainer />
    </Flex>
  )
}