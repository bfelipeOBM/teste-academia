import Constants from '@/application/common/Constants';
import { Flex, HStack, Button, IconButton, Box, Text, FormControl, FormLabel, Input, VStack, Select, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper } from '@chakra-ui/react'
import axios from 'axios';
import { ArrowLeft, } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../Components/BackButton';
import { Header } from '../../Components/Header';
import { Sidebar } from '../../Components/Sidebar';

export const EditClassAdmin = () => {
  const {id, class_id} = useParams();
  const [date, setDate] = useState<Date>();
  const [maxStudents, setMaxStudents] = useState<number>();
  const [locationId, setLocationId] = useState<number>();
  const [classe, setClasse] = useState<any>();

  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/${id}/classes/${class_id}`).then((response) => {
      setClasse(response.data);
    })
  }, [])

  function handleUpdateClass(e: any) {
    e.preventDefault();
    axios.patch(`${Constants.API_URL}courses/${id}/classes/${class_id}`, {
      date,
      max_students: maxStudents,
      location_id: locationId,
    })
  }

  return (
    <Flex w="100%">
      <Sidebar />
      {classe
      ? (
        <Box w="100%">
        <Header>
        <HStack justifyContent="space-between">
        <BackButton />
        </HStack>
        </Header>
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Editar turma</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input
                  type="date"
                  required
                  onChange={(e) => setDate(new Date(e.target.value))}
                  defaultValue={classe?.date.split("T")[0] || ''}
                  />
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
                <FormLabel>Localização {classe?.location_id}</FormLabel>
                <Select defaultValue={classe?.location_id || 1} onChange={(e) => setLocationId(+e.target.value)}>
                  <option value='1'>Online</option>
                  <option value='2'>Mooca</option>
                  <option value='3'>Praia Grande</option>
                  <option value='4'>Benfica</option>
                </Select>
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
      </Box>
      )
      : "Carregando..."}
    </Flex>
    
  );
}
