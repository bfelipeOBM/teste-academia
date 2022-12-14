import Constants from "@/application/common/Constants"
import { ApplicationState } from "@/application/store"
import { userProfile } from "@/application/store/profile/action"
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack, Checkbox, Select } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { BackButton } from "../Components/BackButton"
import { Header } from "../Components/Header"
import { Sidebar } from "../Components/Sidebar"
import { User } from "../interface/user"
import 'react-toastify/dist/ReactToastify.css';

export const UsersAdminEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState<boolean>();
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
    axios.get(`${Constants.API_URL}users/${id}`, {
      headers: {
        'Bearer': `${userState.data?.access_token}`
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
      role?: string;
      active?: boolean;
    }
    const updatedUser: UpdatedUser = {}

    if (name !== "") updatedUser.name = name;
    if (email !== "") updatedUser.email = email;
    if (document !== "") updatedUser.document = document;
    if (phone !== "") updatedUser.phone = phone;
    if (active !== undefined) updatedUser.active = active;
    if (role !== "") updatedUser.role = role;

    axios.patch(`${Constants.API_URL}users/${id}`, updatedUser, {
      headers: {
        'Bearer': `${userState.data?.access_token}`
      }
    }).then((response) => {
      toast.success('Conta editada!', {
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
      toast.error('Erro ao editar conta!', {
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

        {user ? (
          <Box w="100%" maxW={1120} mx="auto" px={8}>
            <Box py={8}>
              <Text fontSize={"2xl"}>Editar usu??rio</Text>
            </Box>
            <VStack as="form" spacing={6}>
              <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" onChange={(e) => setName(e.target.value)} defaultValue={user.name} />
                </FormControl>
              </Box>
              <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} defaultValue={user.email} />
                </FormControl>
              </Box>
              <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                <FormControl>
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <Input type="text" onChange={(e) => setDocument(e.target.value)} defaultValue={user.document} />
                </FormControl>
              </Box>
              <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                <FormControl>
                  <FormLabel>N??mero</FormLabel>
                  <Input type="text" onChange={(e) => setPhone(e.target.value)} defaultValue={user.phone} />
                </FormControl>
              </Box>
              <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                <FormControl>
                  <FormLabel>Permiss??o</FormLabel>
                  <Select onChange={(e) => setRole(e.target.value)} defaultValue={user.role} >
                    <option value={"user"}>Usu??rio</option>
                    <option value={"admin"}>Administrador</option>
                  </Select>
                </FormControl>
              </Box>
              <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                <FormControl>
                  <FormLabel>Aceita receber novidades {user.accept_receive_news}</FormLabel>
                  <Checkbox isChecked={user.accept_receive_news} disabled readOnly />
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
                onClick={(e) => { handleUpdateUser(e) }}
              >Atualizar usu??rio</Button>
            </VStack>
          </Box>
        ) : ("Carregando...")}
      </Box>
      <ToastContainer />
    </Flex>
  )
}
