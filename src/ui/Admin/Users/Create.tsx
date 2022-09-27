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

export const UsersAdminCreate = () => {
  const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState<boolean>(true);
  const [acceptReceiveNews, setAcceptReceiveNews] = useState<boolean>(true);

  function handleCreateUser(e: any) {
    e.preventDefault();
    const createUser = {
      name,
      email,
      document,
      phone,
      password: document.substring(0, 4) + document.substring(document.length - 2, document.length),
      accept_receive_news: acceptReceiveNews,
      active
    }

    console.log(createUser)

    axios.post(`${Constants.API_URL}users/`, createUser)
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
            <Text fontSize={"2xl"}>Criar usuário</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} required/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} required/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>CPF/CNPJ</FormLabel>
                <Input type="text" onChange={(e) => setDocument(e.target.value)} required/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Número</FormLabel>
                <Input type="text" onChange={(e) => setPhone(e.target.value)} required/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Aceita receber novidades </FormLabel>
                <Checkbox
                  isChecked={acceptReceiveNews}
                  onChange={(e) => setAcceptReceiveNews(e.target.checked)}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Ativo</FormLabel>
                <Checkbox
                  isChecked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  />
              </FormControl>
            </Box>
           
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleCreateUser(e)}}
            >Criar usuário</Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  )
}
