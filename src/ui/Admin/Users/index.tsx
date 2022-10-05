import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { Box, Button, Grid, GridItem, Image, Heading, HStack, Text, VStack, IconButton, AspectRatio, Tooltip, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, Input } from "@chakra-ui/react"
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

export const UsersAdminInfos = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<User>();
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    axios.get(`${Constants.API_URL}users`, {
      headers: {
        'Bearer': `${userState.data?.access_token}`
      }
    }).then(res => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    }).catch((error) => {
      toast.error('Erro exibir todos os usuários!', {
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

  function handleDeleteButton(user: User) {
    setUserToDelete(user);
    onOpen();
  }

  console.log(users)

  function handleDeleteUser() {
    axios.delete(`${Constants.API_URL}users/${userToDelete?.id}`, {
      headers: {
        'Bearer': `${userState.data?.access_token}`
      }
    }).then(res => {
      toast.success('Usuário deletado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      setFilteredUsers(filteredUsers.filter(user => user.id !== userToDelete?.id));
      onClose();
    })
  }
  function searchUser(e: any) {
    const search = e.target.value;
    const searchUsers: any = [];

    users.filter(user => {
      if (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.document?.toLowerCase().includes(search.toLowerCase()) || user.phone?.toLowerCase().includes(search.toLowerCase())) {
        searchUsers.push(user);
      }
    })
    setFilteredUsers(searchUsers);
  }

  return (
    <Flex w={"100%"}>
      <Sidebar />
      <VStack w="100%" bg={"gray.100"}>
        <Header>
          <HStack justifyContent="space-between">
            <Heading>Usuários</Heading>
            <HStack spacing={6}>
              <Button
                as={Link}
                to="/admin/users/create/multiple"
                colorScheme="blue"
                size={"lg"}
                leftIcon={<Plus />}>
                Adicionar arquivos via CSV
              </Button>
              <Button
                as={Link}
                to="/admin/users/create"
                colorScheme="green"
                size={"lg"}
                leftIcon={<Plus />}>
                Adicionar um usuário
              </Button>
            </HStack>
          </HStack>
        </Header>
        <Box as="main" w={"100%"} maxW={1120} mx="auto">
          <Input
            w={"100%"}
            maxW={1120}
            mx="auto"
            mt={4}
            mb={4}
            bg="white"
            placeholder="Pesquisar usuário"
            onChange={searchUser}
          />
          <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {filteredUsers.map(user => (
              <GridItem
                key={user.id}
                w='100%'
                bg='blue.500'
                borderRadius="16px"
                bgColor={"white"}
                overflow={"hidden"}
                border="1px solid #DCE2E6"
                position="relative">
                <AspectRatio ratio={16 / 9}>
                  <Image src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} objectFit="cover" />
                </AspectRatio>
                <Box p={8}>
                  <Heading size="lg" noOfLines={[1, 2]}>{user.name}</Heading>
                </Box>
                <Box position={"absolute"} top={4} right={4}>
                  <HStack>
                    <Tooltip label="Editar informações do usuário">
                      <IconButton
                        as={Link}
                        to={`/admin/users/${user.id}/edit`}
                        icon={<PencilLine size={30} />}
                        colorScheme={"gray"}
                        aria-label="Editar usuário" />
                    </Tooltip>
                    <Tooltip label="Deletar usuário">
                      <IconButton
                        icon={<Trash size={30} />}
                        colorScheme={"red"}
                        aria-label="Deletar usuário"
                        onClick={() => handleDeleteButton(user)} />
                    </Tooltip>
                  </HStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Deseja excluir o usuário <Text as="strong">{userToDelete?.name}</Text>? e todas as informações relacionados a ele?
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Fechar
              </Button>
              <Button colorScheme='red' onClick={handleDeleteUser}>Deletar usuário</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
      <ToastContainer />
    </Flex>
  )
}
