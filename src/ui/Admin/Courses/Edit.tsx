import Constants from "@/application/common/Constants"
import { ApplicationState } from "@/application/store"
import { userProfile } from "@/application/store/profile/action"
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Grid, Link } from "@chakra-ui/react"
import axios from "axios"
import { Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
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

    const updatedCourse: UpdatedCorse = {}

    if (name !== "") updatedCourse.name = name;
    if (description !== "") updatedCourse.description = description;
    if (image !== "") updatedCourse.image = image;
    if (video !== "") updatedCourse.video = video;
    if (specialty !== "") updatedCourse.specialty = specialty;
    if (workload !== 0.0) updatedCourse.workload = workload;
    updatedCourse.category = selectedOptions;
    updatedCourse.active = active;

    // setTimeout(() => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === this.DONE) {
    //       if (this.status === 201) {
    //         toast.success('Curso editado!', {
    //           position: "top-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: 'colored'
    //         });
    //         setTimeout(() => {
    //           navigate(-1);
    //         }, 4000)
    //       } else {
    //         toast.error('Erro ao editar curso!', {
    //           position: "top-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: 'colored'
    //         });
    //       }
    //     }
    //   });
  
    //   xhr.open('PATCH', `${Constants.API_URL}courses/${id}`);
    //   xhr.setRequestHeader("Bearer", `${userState.data?.access_token}`)
    //   xhr.send(data);

    //   // xhr.send(data);
    // }, 10000);
    // e.preventDefault()
    
    // const form = new FormData();
    // if (name !== "") form.append("name", name);
    // if (description !== "") form.append("description", description);
    // if (image !== "") form.append("image", image);
    // if (video !== "") form.append("video", video);
    // if (specialty !== "") form.append("specialty", specialty);
    // form.append("category", selectedOptions.join(","));
    // form.append("active", active ? "1" : "0");

    // let request = new XMLHttpRequest();
    // request.open('PATCH', `${Constants.API_URL}courses/${id}`);
    // request.setRequestHeader("Bearer", `${userState.data?.access_token}`)
    // request.send(form);
  }

  function handleAddImage(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setImage(reader.result)
    }
    reader.readAsDataURL(file);
  }
  
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
          <VStack as="form" spacing={6}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} defaultValue={course?.name}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea onChange={(e) => setDescription(e.target.value)} defaultValue={course?.description} />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Especialidade</FormLabel>
                <Input type="text" onChange={(e) => setSpecialty(e.target.value)} defaultValue={course?.specialty}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Carga horária</FormLabel>
                <Input type="number" onChange={(e) => setWorkload(+e.target.value)} defaultValue={course?.workload}/>
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
              type='button'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              onClick={(e) => {handleUpdateCourse(e)}}
            >Atualizar curso</Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  )
}
