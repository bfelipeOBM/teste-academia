import Constants from "@/application/common/Constants";
import { Box, Button, Grid, GridItem, Image, Heading, HStack, Text, VStack, IconButton, AspectRatio, Tooltip, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex } from "@chakra-ui/react"
import axios from "axios"
import { Eye, PencilLine, Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { Course } from "../interface/course";
import { User } from "../interface/user";

export const UsersAdminInfos = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<User>();
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    axios.get(`${Constants.API_URL}users`, {
      headers: {
        'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hbmRpb2NhIiwiZXhwIjoxNjY2NjQwODU2LCJyb2xlIjoiYWRtaW4ifQ.e5eTWGFPGQ7e87AJZRGd_8dkVNnpVlCH9T-4pxa4hXc'
      }
    }).then(res => {
      setUsers(res.data);
    })
  }, [])

  function handleDeleteButton(user: User) {
    setUserToDelete(user);
    onOpen();
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
                leftIcon={<Plus /> }>
                  Adicionar arquivos via CSV
              </Button>
              <Button
                as={Link}
                to="/admin/users/create"
                colorScheme="green"
                size={"lg"}
                leftIcon={<Plus /> }>
                  Adicionar um usuário
              </Button>
            </HStack>
          </HStack>
        </Header>
        <Box as="main" w={"100%"} maxW={1120} mx="auto">
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          {users.map(user => (
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
              <Image src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} objectFit="cover"/>
            </AspectRatio>
            <Box p={8}>
              <Heading size="lg">{user.name}</Heading>
            </Box>
            <Box position={"absolute"} top={4} right={4}>
              <HStack>
                <Tooltip label="Editar informações do usuário">
                  <IconButton
                    as={Link}
                    to={`/admin/users/${user.id}/edit`}
                    icon={<PencilLine size={30}/>}
                    colorScheme={"gray"}
                    aria-label="Editar usuário" />
                </Tooltip>
                <Tooltip label="Deletar usuário">
                  <IconButton
                    icon={<Trash size={30}/>}
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
              <Button colorScheme='red'>Deletar usuário</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Flex>
  )
}
