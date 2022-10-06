import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Grid, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BackButton } from '../Components/BackButton';
import { Header } from '../Components/Header';
import { Sidebar } from '../Components/Sidebar';

export const CreateCourseAdmin = () => {
  const options = ["Pedreiro", "Encanador", "Eletricista", "Marceneiro", "Pintor", "Serralheiro", "Gesseiro", "Aplicador de drywall", "Marido de aluguel", "Mestre de obras"]

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [video, setVideo] = useState("")
  const [image, setImage] = useState<any>("")
  const [workload, setWorkload] = useState(0.0);
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const [loadingCreateCourse, setLoadingCreateCourse] = useState(false);
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


  function handleAddCategory(e: any) {
    const category = e.target.value
    if (selectedOptions.includes(category)) {
      setSelectedOptions(selectedOptions.filter(item => item !== category))
    } else {
      setSelectedOptions([...selectedOptions, category])
    }
  }

  function handleAddAllCategories(e: any) {
    if (e.target.checked) {
      setSelectedOptions(options)
    } else {
      setSelectedOptions([])
    }
  }

  function handleAddImage(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setImage(reader.result)
    }
    reader.readAsDataURL(file);
  }

  async function handleCreateCourse(e: any) {
    e.preventDefault()

    const data = JSON.stringify({
      "name": name,
      "description": description,
      "image": image,
      "video": video,
      "specialty": specialty,
      "category": selectedOptions,
      "workload": workload,
      "location_id": 1,
      "active": true
    });

    console.log(data)

    setLoadingCreateCourse(true)

    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      setLoadingCreateCourse(false);
      xhr.addEventListener("readystatechange", function () {
        console.log(this.readyState)
        if (this.readyState === this.DONE) {
          setLoadingCreateCourse(false)
          if (this.status === 201) {
            toast.success('Curso criado!', {
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
            }, 4000)
          } else {
            toast.error('Erro ao criar curso!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            });
          }
        }
      });
  
      xhr.open('POST', `${Constants.API_URL}courses/`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Bearer", `${userState.data?.access_token}`)

      xhr.send(data);
    }, 10000);
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
            <Text fontSize={"2xl"}>Criar um novo curso</Text>
          </Box>
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} maxLength={105} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea onChange={(e) => setDescription(e.target.value)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Especialidade</FormLabel>
                <Input type="text" onChange={(e) => setSpecialty(e.target.value)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Carga horária</FormLabel>
                <NumberInput defaultValue={1} precision={1} min={1} onChange={(value) => setWorkload(+value)} >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormLabel>Profissão</FormLabel>
              <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                <Checkbox
                  value="Todos"
                  onChange={(e) => {handleAddAllCategories(e)}}
                  >Todos</Checkbox>
                {options.map((value) => (
                  <Checkbox
                    key={value}
                    value={value}
                    onChange={(e) => handleAddCategory(e)}
                    isChecked={selectedOptions.includes(value)}
                  >{value}</Checkbox>
                ))}
              </Grid>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Link do vídeo</FormLabel>
                <Input type="text" onChange={(e) => setVideo(e.target.value)} required placeholder='Link do vídeo no youtube' />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Imagem do curso (apenas PNG, GIF, JPEG e JPG)</FormLabel>
                <Input type="file" name="file" onChange={(e) => handleAddImage(e)} required />
              </FormControl>
            </Box>
            <Button
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              disabled={loadingCreateCourse}
              onClick={(e) => { handleCreateCourse(e) }}
            >{loadingCreateCourse ? "Criando curso..." : "Criar curso"}</Button>
          </VStack>
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
