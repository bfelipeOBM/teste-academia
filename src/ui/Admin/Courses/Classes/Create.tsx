import Constants from '@/application/common/Constants';
import { Flex, HStack, Button, IconButton, Box, Text, FormControl, FormLabel, Input, VStack, Select, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper } from '@chakra-ui/react'
import axios from 'axios';
import { ArrowLeft, } from 'phosphor-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../Components/BackButton';
import { Header } from '../../Components/Header';
import { Sidebar } from '../../Components/Sidebar';

export const CreateClassAdmin = () => {
  const {id} = useParams();
  const [date, setDate] = useState<Date>();
  const [maxStudents, setMaxStudents] = useState(0);
  const [locationId, setLocationId] = useState(1);

  function handleCreateClass(e: any) {
    e.preventDefault();
    axios.post(`${Constants.API_URL}courses/${id}/classes/`, {
      date,
      max_students: maxStudents,
      location_id: locationId,
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
            <Text fontSize={"2xl"}>Criar uma nova turma</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input type="date" required onChange={(e) => setDate(new Date(e.target.value))} />
              </FormControl>
            </Box>
            
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Quantidade de participantes</FormLabel>
                <NumberInput defaultValue={0} min={0} onChange={(e) => setMaxStudents(+e)}>
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
                </Select>
              </FormControl>
            </Box>
           
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
    </Flex>
  );
}
