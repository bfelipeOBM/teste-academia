import Constants from "@/application/common/Constants"
import { Flex, HStack, Button, IconButton, AspectRatio, Heading, Box, Image, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Grid } from "@chakra-ui/react"
import axios from "axios"
import { ArrowLeft, Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BackButton } from "../Components/BackButton"
import { Header } from "../Components/Header"
import { Sidebar } from "../Components/Sidebar"
import { Course } from "../interface/course"
import { User } from "../interface/user"

export const UsersAdminEdit = () => {
  const {id} = useParams();
  const [user, setUser] = useState<User>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState<boolean>();

  useEffect(() => {
    axios.get(`${Constants.API_URL}users/${id}`, {
      headers: {
        'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hbmRpb2NhIiwiZXhwIjoxNjY2NjQwODU2LCJyb2xlIjoiYWRtaW4ifQ.e5eTWGFPGQ7e87AJZRGd_8dkVNnpVlCH9T-4pxa4hXc'
      }
    }).then(res => {
      setUser(res.data);
    })
  }, [])

  function handleUpdateUser(e: any) {
    e.preventDefault();
    type UpdatedUser = {
      name?: string;
      email?: string;
      document?: string;
      phone?: string;
      active?: boolean;
    }
    const updatedUser: UpdatedUser = {}

    if (name !== "") updatedUser.name = name;
    if (email !== "") updatedUser.email = email;
    if (document !== "") updatedUser.document = document;
    if (phone !== "") updatedUser.phone = phone;
    if (active !== undefined) updatedUser.active = active;

    axios.patch(`${Constants.API_URL}users/${id}`, updatedUser, {
      headers: {
        'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hbmRpb2NhIiwiZXhwIjoxNjY2NjQwODU2LCJyb2xlIjoiYWRtaW4ifQ.e5eTWGFPGQ7e87AJZRGd_8dkVNnpVlCH9T-4pxa4hXc'
      }
    })
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
        
        {user ? (
          <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Editar usuário</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} placeholder={user.name}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder={user.email}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>CPF/CNPJ</FormLabel>
                <Input type="text" onChange={(e) => setDocument(e.target.value)} placeholder={user.document}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Número</FormLabel>
                <Input type="text" onChange={(e) => setPhone(e.target.value)} placeholder={user.phone}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Aceita receber novidades {user.accept_receive_news}</FormLabel>
                <Checkbox isChecked={user.accept_receive_news} disabled readOnly/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Ativo</FormLabel>
                <Checkbox
                  defaultChecked={user.active}
                  onChange={(e) => setActive(e.target.checked)}
                  />
              </FormControl>
            </Box>
           
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleUpdateUser(e)}}
            >Atualizar usuário</Button>
          </VStack>
        </Box>
        ) : ("Carregando...")}
      </Box>
    </Flex>
  )
}
