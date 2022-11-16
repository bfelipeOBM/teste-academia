import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { AspectRatio, Box, Button, Checkbox, Flex, Grid, GridItem, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Header } from "../../Components/Header";
import { Sidebar } from "../../Components/Sidebar";
import { InfosCreateMaterialAdmin } from "../Material/Infos";
import { CertificateModal } from "./Certificates/Modal"

export const ClassesInfoAdmin = () => {
  const {id, class_id} = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [classe, setClasse] = useState<any>();
  const [searchUsers, setSearchUsers] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userState = useSelector((state: ApplicationState) => state.user);
  const [updateUsers, setUpdateUsers] = useState(false);
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
    axios.get(`${Constants.API_URL}courses/${id}/classes/${class_id}`, {
      headers: {
        Bearer: `${userState.data?.access_token}`
      }
    }).then((res) => {
      setClasse(res.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/${id}/classes/${class_id}/enrollments`, {
      headers: {
        Bearer: `${userState.data?.access_token}`
      }
    }).then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classe, updateUsers])
  const regex = /[\s+]|[\.+]|[\D+]/g

  function searchUser(e: any) {
    const search = e.target.value;
    const withourSpecialCharacters = search.replace(regex, '');
    const searchUsers: any = [];
    
    users.filter(user => {
      const userDocument = user.document?.replaceAll(regex, '')
      const userPhone = user.phone?.replaceAll(regex, '')

      if (user.name?.toLowerCase().includes(search.toLowerCase()) || user.email?.toLowerCase().includes(search.toLowerCase())) {
        searchUsers.push(user);
      }
      if (withourSpecialCharacters.length > 0) {
        if (userDocument?.toLowerCase().includes(withourSpecialCharacters) || userPhone?.toLowerCase().includes(withourSpecialCharacters)) {
          searchUsers.push(user);
        }
      }
    })
    setFilteredUsers(searchUsers);
  }

  function handleUpdateUserParticipated(e: any, user_id: number) {
    axios.patch(`${Constants.API_URL}courses/${id}/classes/${class_id}/enrollments/${user_id}`, {
      user_participated: e.target.checked,
    }, {
      headers: {
        Bearer: `${userState.data?.access_token}`
      }
    })

    const updatedUsers = users?.map(user => {
      if (user.user_id === user_id) {
        user.user_participated = e.target.checked
      }
      return user
    })
    setFilteredUsers(updatedUsers)
  }

  function sendCertificates(e: any) {
    axios.post(`${Constants.API_URL}courses/${id}/class/${class_id}/certificate/send`, {}, {headers: {
      Bearer: `${userState.data?.access_token}`
    }})
  }

  function handleSearchUser(text: string) {
    axios.get(`${Constants.API_URL}users?search=${text}`, {
      headers: {
        Bearer: `${userState.data?.access_token}`
      }
    }).then((res) => {
      setSearchUsers(res.data);
    }).finally(() => {
      searchUsers.map((user: any) => {
        if (user.name === text) {
          setSearchUsers([user]);
        }
      })
    })
  }

  function handleAddUserToClass() {
    axios.post(`${Constants.API_URL}courses/${id}/classes/${class_id}/enrollment`, {
      user_id: searchUsers[0].id
    }, {
      headers: {
        Bearer: `${userState.data?.access_token}`
      }
    }).then(() => {
      toast.success('Usuário adicionado!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      setUpdateUsers(true);
    }).catch(() => {
      toast.error('Usuário já cadastrado!', {
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
    setSearchUsers([]);
  }

  function createCSV() {
    const rows = [
      ["Nome", "Email", "Telefone", "CPF", "Participou"],
      ...users.map(user => {
        return [
          user.name,
          user.email,
          user.phone,
          user.document,
          user.user_participated ? "Sim" : "Não"
        ]
      })
    ]
    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${classe.name}-${new Intl.DateTimeFormat('pt-BR').format(new Date(classe?.date))}.csv`);
    document.body.appendChild(link);

    link.click();
  }

  return (
    <Flex w="100%">
      <Sidebar />
      <Box w="100%">
        <Header>
        <HStack justifyContent="space-between">
        <Box>
        <Heading>Turma { classe && new Intl.DateTimeFormat('pt-BR').format(new Date(classe?.date))}</Heading>
        <Heading fontSize={"2xl"}>Quantidade de inscritos: {classe?.students_count} / {classe?.max_students}</Heading>
        </Box>
        <Heading fontSize={"2xl"}>Parceiro: {classe?.partner}</Heading>
          <Box>
            <Button colorScheme="green" size={"lg"} leftIcon={<Plus />} onClick={onOpen}>Adicionar aluno a turma</Button>
          </Box>
        </HStack>
        </Header>
        <Box w="100%" maxW={1120} mx="auto">
          <Box mt={8}>
          <Heading>Curso: {classe && classe.name}</Heading>
            <InfosCreateMaterialAdmin />
          </Box>
          <Box py={8}>
            <Heading fontSize={"4xl"}>Alunos inscritos</Heading>
              <HStack>
                <Button onClick={createCSV} colorScheme={"blue"}>Gerar CSV</Button>
                <Link to={`/admin/courses/${id}/class/${class_id}/certificate`}><Button colorScheme={"orange"}>Gerar Certificado</Button></Link>
               
                <CertificateModal users={users} />
              </HStack>
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
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(4, 1fr)']} gap={6}>
              {filteredUsers?.map(user => (
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
                    <Text>{user.email}</Text>
                    <Text>{user.phone}</Text>
                    <Checkbox mt={4}
                      defaultChecked={user.user_participated}
                      onChange={(e) => handleUpdateUserParticipated(e, user.user_id)}
                      >{user.user_participated ? 'Usuário participou' : 'Confirmar presença'}</Checkbox>
                  </Box>
                </GridItem>
              ))}

            </Grid>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Pesquise o usuário"
              list="users"
              onChange={(e) => {
                handleSearchUser(e.target.value);
              }}
            />
            <datalist id="users">
              {searchUsers?.map(user => (
                <option value={user.name} />
              ))}
            </datalist>
          </ModalBody>

          <ModalFooter>
            <Button variant={'outline'} mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              colorScheme={'green'}
              onClick={() => {handleAddUserToClass(); onClose()}}
            >Adicionar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Pesquise o usuário"
              list="users"
              onChange={(e) => {
                handleSearchUser(e.target.value);
              }}
            />
            <datalist id="users">
              {searchUsers?.map(user => (
                <option value={user.name} />
              ))}
            </datalist>
          </ModalBody>

          <ModalFooter>
            <Button variant={'outline'} mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              colorScheme={'green'}
              onClick={() => {handleAddUserToClass(); onClose()}}
            >Adicionar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </Flex>
  );
};
