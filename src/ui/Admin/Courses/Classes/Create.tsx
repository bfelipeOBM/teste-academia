import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack, Select, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, Checkbox } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BackButton } from '../../Components/BackButton';
import { Header } from '../../Components/Header';
import { Sidebar } from '../../Components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';

export const CreateClassAdmin = () => {
  const {id} = useParams();
  const [date, setDate] = useState<Date>();
  const [maxStudents, setMaxStudents] = useState(0);
  const [partner, setPartner] = useState("");
  const [locationId, setLocationId] = useState(1);
  const [active, setActive] = useState(true);
  const [sympla, setSympla] = useState<any>(null);
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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

  function handleCreateClass(e: any) {
    e.preventDefault();
    axios.post(`${Constants.API_URL}courses/${id}/classes/`, {
      date,
      max_students: maxStudents,
      location_id: locationId,
      partner: partner,
      sympla_url: sympla,
      active: active
    }, {
      headers: {
        "Bearer": `${userState.data?.access_token}`
      }
    }).then((response) => {
      toast.success('Turma criada!', {
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
          navigate(-1);
        }, 2000)
    }).catch((error) => {
      toast.error('Erro ao criar turma!', {
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
      <Box w="100%" px={8}>
        <Header>
        <HStack justifyContent="space-between">
          <BackButton />
        </HStack>
        </Header>
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Criar uma nova turma</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input type="datetime-local" required onChange={(e) => setDate(new Date(e.target.value))} />
              </FormControl>
            </Box>

            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Parceiro</FormLabel>
                <Input type="text" required onChange={(e) => setPartner(e.target.value)} />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Link do Sympla</FormLabel>
                <Input type="text" onChange={(e) => setSympla(e.target.value)} />
              </FormControl>
            </Box>
            
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Quantidade de participantes</FormLabel>
                <NumberInput defaultValue={0} min={1} onChange={(e) => setMaxStudents(+e)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              </FormControl>
            </Box>

            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Localização</FormLabel>
                <Select onChange={(e) => setLocationId(+e.target.value)}>
                  <option value='1'>Online</option>
                  <option value='2'>Mooca</option>
                  <option value='3'>Praia Grande</option>
                  <option value='4'>Benfica</option>
                  <option value='5'>Paraisópolis</option>
                </Select>
              </FormControl>
            </Box>

            <FormControl>
              <FormLabel>Curso ativo</FormLabel>
              <Checkbox
                onChange={(e) => setActive(e.target.checked)}
                isChecked={active}/>
            </FormControl>
           
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleCreateClass(e)}}
            >Criar turma</Button>
          </VStack>
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
