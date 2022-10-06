import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { AspectRatio, Box, Button, Checkbox, Flex, Grid, GridItem, Heading, HStack, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header";
import { Sidebar } from "../../Components/Sidebar";
import { User } from "../../interface/user";

export const ClassesInfoAdmin = () => {
  const {id, class_id} = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [classe, setClasse] = useState<any>();
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
  }, [classe])

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

  function handleUpdateUserParticipated(e: any, user_id: number) {
    axios.patch(`${Constants.API_URL}courses/${id}/classes/${class_id}/enrollments/${user_id}`, {
      user_participated: e.target.checked,
    })

    const updatedUsers = users?.map(user => {
      if (user.user_id === user_id) {
        user.user_participated = e.target.checked
      }
      return user
    })
    setFilteredUsers(updatedUsers)
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
            <Button colorScheme="green" size={"lg"} leftIcon={<Plus />}>Adicionar aluno a turma</Button>
          </Box>
        </HStack>
        </Header>
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Heading fontSize={"4xl"}>Alunos inscritos</Heading>
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
          {/* <GridItem
                  // key={user.id}
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
                    <Heading size="lg">Banana</Heading>
                    <Text>Banana@email.com</Text>
                    <Text>Banana</Text>
                  </Box>
                </GridItem> */}

            </Grid>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
