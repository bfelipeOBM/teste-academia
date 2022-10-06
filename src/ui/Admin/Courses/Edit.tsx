import Constants from "@/application/common/Constants"
import { ApplicationState } from "@/application/store"
import { userProfile } from "@/application/store/profile/action"
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Grid, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Image } from "@chakra-ui/react"
import axios from "axios"
import { Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { BackButton } from "../Components/BackButton"
import { Header } from "../Components/Header"
import { Sidebar } from "../Components/Sidebar"
import { Course } from "../interface/course"

type UpdatedCorse = {
  [key: string]: any;
}

export const EditCourseAdmin = () => {
  const options = ["Pedreiro", "Encanador", "Eletricista", "Marceneiro", "Pintor", "Serralheiro", "Gesseiro", "Aplicador de drywall", "Marido de aluguel", "Mestre de obras"];
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [video, setVideo] = useState("")
  const [image, setImage] = useState<any>("")
  const [active, setActive] = useState<boolean>()
  const [workload, setWorkload] = useState(0.0);
  const [loading, setLoading] = useState(false)
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

  const {id} = useParams();
  const [course, setCourse] = useState<Course>();
  
  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/${id}`).then(res => {
      setCourse(res.data);
      setSelectedOptions(res.data.category  );
      setActive(res.data.active);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAddCategory(e: any) {
    const category = e.target.value
    if (selectedOptions.includes(category)) {
      setSelectedOptions(selectedOptions.filter(item => item !== category))
    } else {
      setSelectedOptions([...selectedOptions, category])
    }
  }

  function handleUpdateCourse(e: any) {
    e.preventDefault();
    setLoading(true)
    const updatedCourse: UpdatedCorse = {}

    if (name !== "") updatedCourse.name = name;
    if (description !== "") updatedCourse.description = description;
    if (image !== "") updatedCourse.image = image;
    if (specialty !== "") updatedCourse.specialty = specialty;
    if (workload !== 0.0) updatedCourse.workload = workload;
    updatedCourse.category = selectedOptions;
    updatedCourse.active = active;
    const xhr = new XMLHttpRequest();
    setTimeout(() => {
      xhr.addEventListener("readystatechange", function () {
        setLoading(false)
        if (this.readyState === this.DONE) {
          if (this.status === 201) {
            toast.success('Curso editado!', {
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
            toast.error('Erro ao editar curso!', {
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
  
      xhr.open('PATCH', `${Constants.API_URL}courses/${id}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Bearer", `${userState.data?.access_token}`)
      const updatedCourseString = JSON.stringify(updatedCourse);
      xhr.send(updatedCourseString);
    }, 10000);
  }

  function handleAddImage(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setImage(reader.result)
    }
    reader.readAsDataURL(file);
  }
  
  console.log(course?.workload)

  return (
    <Flex w="100%">
      <Sidebar />
      <Box w="100%">
        <Header>
        <HStack justifyContent="space-between">
          <BackButton />
          <Box>
            <Button
              as={Link}
              to={`/admin/courses/${id}/classes/create`}
              colorScheme="green"
              size={"lg"}
              leftIcon={<Plus />}
              >Adicionar uma turma</Button>
          </Box>
        </HStack>
        </Header>
        
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Criar um novo curso</Text>
          </Box>
          <VStack as="form" spacing={6} onSubmit={(e) => {handleUpdateCourse(e)}}>
            {course && (
              <>
                <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} defaultValue={course?.name} maxLength={105} required/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Descrição</FormLabel>
                <Textarea onChange={(e) => setDescription(e.target.value)} defaultValue={course?.description} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Especialidade</FormLabel>
                <Input type="text" onChange={(e) => setSpecialty(e.target.value)} defaultValue={course?.specialty}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl isRequired>
                <FormLabel>Carga horária</FormLabel>
                <NumberInput defaultValue={course?.workload} precision={1} min={1} onChange={(value) => setWorkload(+value)} >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
                <FormLabel>Categoria</FormLabel>
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {options.map((value) => (
                  <Checkbox
                    value={value}
                    key={value}
                    onChange={(e) => handleAddCategory(e)}
                    isChecked={selectedOptions.includes(value)}
                  >{value}</Checkbox>
                ))}
              </Grid>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Link do vídeo</FormLabel>
                <Input type="text" onChange={(e) => setVideo(e.target.value)} defaultValue={course?.video}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Imagem do curso (apenas PNG, GIF, JPEG e JPG)</FormLabel>
                <Input
                  type="file"
                  name="file"
                  onChange={(e) => handleAddImage(e)}
                  accept="image/png, image/gif, image/jpeg, image/jpg "/>
                  <Box>
                    <Image src={course.image} alt='Dan Abramov' />
                  </Box>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Curso ativo</FormLabel>
                <Checkbox
                  onChange={(e) => setActive(e.target.checked)}
                  // onChange={(e) => handleAddImage(e)}
                  isChecked={active}
                  accept="image/png, image/gif, image/jpeg, image/jpg "/>
              </FormControl>
            </Box>
            <Button
              type='submit'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              disabled={loading}
            >{loading ? "Atualizando curso" : "Atualizar curso"}</Button>
              </>
            )}
          </VStack>
        </Box>
      </Box>
    </Flex>
  )
}
