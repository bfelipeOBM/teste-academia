import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Grid, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, FormErrorMessage } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BackButton } from '../Components/BackButton';
import { Header } from '../Components/Header';
import { Sidebar } from '../Components/Sidebar';
import 'react-quill/dist/quill.snow.css';

export const CreateCourseAdmin = () => {
  const options = ["Pedreiro", "Encanador", "Eletricista", "Marceneiro", "Pintor", "Serralheiro", "Gesseiro", "Aplicador de drywall", "Marido de aluguel", "Mestre de obras"]

  const [name, setName] = useState("")
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [video, setVideo] = useState("")
  const [image, setImage] = useState<any>("")
  const [workload, setWorkload] = useState(0.0);
  const [checkboxError, setCheckboxError] = useState(false);
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

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setCheckboxError(false);
    } else {
      setCheckboxError(true);
    }
  }, [selectedOptions])


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
      "summary": summary,
      "description": description,
      "image": image,
      "video": video,
      "specialty": specialty,
      "category": selectedOptions,
      "workload": workload,
      "location_id": 1,
      "active": true
    });


    setLoadingCreateCourse(true)

    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      setLoadingCreateCourse(false);
      xhr.addEventListener("readystatechange", function () {
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

        <Box w="100%" maxW={1120} mx="auto" px={8}>
          <Box py={8}>
            <Text fontSize={"2xl"}>Criar um novo curso</Text>
          </Box>
          <VStack as="form" spacing={6} onSubmit={(e) => { handleCreateCourse(e)}}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} maxLength={105} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Resumo</FormLabel>
                <Textarea onChange={e => {setSummary(e.target.value)}} size={"sm"} maxLength={350} />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Descrição</FormLabel>
                <ReactQuill theme='snow' onChange={setDescription} />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Especialidade</FormLabel>
                <Input type="text" onChange={(e) => setSpecialty(e.target.value)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
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
              {checkboxError && <Text mb={3} color="red.500">Selecione pelo menos uma profissão</Text>}
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
                <Input type="text" onChange={(e) => setVideo(e.target.value)} placeholder='Link do vídeo no youtube' />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Imagem do curso (apenas PNG, GIF, JPEG e JPG)</FormLabel>
                <Input type="file" name="file" onChange={(e) => handleAddImage(e)} required />
              </FormControl>
            </Box>
            <Button
              type='submit'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              disabled={loadingCreateCourse}
            >{loadingCreateCourse ? "Criando curso..." : "Criar curso"}</Button>
          </VStack>
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
