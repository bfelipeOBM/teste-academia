import Constants from "@/application/common/Constants"
import { ApplicationState } from "@/application/store"
import { userProfile } from "@/application/store/profile/action"
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack, Checkbox, Select } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import { BackButton } from "../Components/BackButton"
import { Header } from "../Components/Header"
import { Sidebar } from "../Components/Sidebar"
import 'react-toastify/dist/ReactToastify.css';

export const UsersAdminCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [active, setActive] = useState<boolean>(true);
  const [acceptReceiveNews, setAcceptReceiveNews] = useState<boolean>(true);
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
  }, [userState.isLoggedIn, dispatch]);

  function handleCreateUser(e: any) {
    e.preventDefault();
    const createUser = {
      name,
      email,
      document,
      phone,
      role,
      password: document.substring(0, 4) + document.substring(document.length - 2, document.length),
      accept_receive_news: acceptReceiveNews,
      active
    }

    axios.post(`${Constants.API_URL}users/`, createUser).then((response) => {
      toast.success('Conta criada!', {
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
        window.location.href = "/admin/users";
      }, 2000)
    }).catch((error) => {
      toast.error('Erro ao criar conta!', {
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
                <Input type="text" onChange={(e) => setName(e.target.value)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" onChange={(e) => setEmail(e.target.value)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>CPF/CNPJ</FormLabel>
                <Input type="text" onChange={(e) => setDocument(e.target.value)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Número</FormLabel>
                <Input type="text" onChange={(e) => setPhone(e.target.value)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Permissão</FormLabel>
                <Select onChange={(e) => setRole(e.target.value)} defaultValue={"user"}>
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </Select>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Aceita receber novidades </FormLabel>
                <Checkbox
                  isChecked={acceptReceiveNews}
                  onChange={(e) => setAcceptReceiveNews(e.target.checked)} />
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
              onClick={(e) => { handleCreateUser(e) }}
            >Criar usuário</Button>
          </VStack>
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  )
}
