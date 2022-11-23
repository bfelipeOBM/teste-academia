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

export const EditClassAdmin = () => {
  const {id, class_id} = useParams();
  const [date, setDate] = useState<Date>();
  const [maxStudents, setMaxStudents] = useState<number>();
  const [locationId, setLocationId] = useState<number>();
  const [classe, setClasse] = useState<any>();
  const [partner, setPartner] = useState<string>();
  const [sympla, setSympla] = useState<any>();
  const [active, setActive] = useState<boolean>();
  const [sendActive, setSendActive] = useState<boolean>();
  const [observation, setObservation] = useState<string>();
  const [sendEmail, setSendEmail] = useState(true);
  const [locations, setLocations] = useState<any>([]);
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

  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/${id}/classes/${class_id}`).then((response) => {
      setClasse(response.data);
      setActive(response.data.class_active)
    })

    axios.get(`${Constants.API_URL}courses/locations`).then(res => {
      setLocations(res.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleUpdateClass(e: any) {
    e.preventDefault();


    axios.patch(`${Constants.API_URL}courses/${id}/classes/${class_id}`, {
      date,
      max_students: maxStudents,
      location_id: locationId,
      partner: partner,
      sympla_url: sympla,
      active: sendActive,
      email_observation: observation,
      send_email: sendEmail,
    }, { headers: { Bearer: `${userState.data?.access_token}` } }).then((response) => {
      toast.success('Turma editada!', {
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
      }, 3000)
    }).catch(() => {
      toast.error('Erro ao editar turma!', {
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
      {classe
      ? (
        <Box w="100%">
        <Header>
        <HStack justifyContent="space-between">
        <BackButton />
        </HStack>
        </Header>
        <Box w="100%" maxW={1120} mx="auto" px={8}>
          <Box py={8}>
            <Text fontSize={"2xl"}>Editar turma</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input
                  type="datetime-local"
                  required
                  onChange={(e) => setDate(new Date(e.target.value))}
                  defaultValue={classe?.date.slice(0, -3) || ''}
                  />
              </FormControl>
            </Box>

            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
            <FormControl>
                <FormLabel>Parceiro</FormLabel>
                <Input type="text" defaultValue={classe?.partner} onChange={(e) => setPartner(e.target.value)} />
              </FormControl>
            </Box>

            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Link do Sympla</FormLabel>
                <Input type="text" defaultValue={classe?.sympla_url} onChange={(e) => setSympla(e.target.value)} />
              </FormControl>
            </Box>
            
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Quantidade de participantes</FormLabel>
                <NumberInput
                  defaultValue={classe?.max_students}
                  min={0}
                  max={100}
                  onChange={(e) => setMaxStudents(+e)}>
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
                <Select defaultValue={classe?.location_id || 1} onChange={(e) => setLocationId(+e.target.value)}>
                  {locations.map((location: any) => (
                    <option value={location.id}>{location.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
            <FormControl>
              <FormLabel>Turma ativa</FormLabel>
              <Checkbox
                onChange={(e) => {setActive(e.target.checked); setSendActive(e.target.checked)}}
                isChecked={active}/>
            </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
            <FormControl>
              <FormLabel>Motivo da mudança de data/cancelamento (enviado por e-mail) </FormLabel>
              <Input
                type="text"
                onChange={(e) => setObservation(e.target.value)}
              />
            </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
            <FormControl>
            <FormLabel>Notificar usuários por email?</FormLabel>
              <Checkbox
                isChecked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
              />
            </FormControl>
           </Box>
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleUpdateClass(e)}}
            >Editar turma</Button>
          </VStack>
        </Box>
        <ToastContainer />
      </Box>
      )
      : "Carregando..."}
    </Flex>
    
  );
}
