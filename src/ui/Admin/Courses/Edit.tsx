import Constants from "@/application/common/Constants"
import { ApplicationState } from "@/application/store"
import { userProfile } from "@/application/store/profile/action"
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Grid } from "@chakra-ui/react"
import axios from "axios"
import { Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { BackButton } from "../Components/BackButton"
import { Header } from "../Components/Header"
import { Sidebar } from "../Components/Sidebar"
import { Course } from "../interface/course"

export const EditCourseAdmin = () => {
  const options = ["Eletricista", "Pedreiro", "Mestre de Obras", "Encanador", "Empreiteiro", "Técnico em construção civil/edificações", "Hidráulico", "Azulejista", "Arquiteto", "Assentador de pisos", "Marceneiro", "Pintor", "Engenheiro"]
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [video, setVideo] = useState("")
  const [image, setImage] = useState("")
  const [active, setActive] = useState<boolean>()
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (profile && userState) {
      if (userState.isLoggedIn && profile.role === "admin") {
        dispatch(userProfile() as any);
      } else if (profile.role === "user") {
        window.location.href = "/";
      } else if (!userState.isLoggedIn) {
        window.location.href = "/";
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.isLoggedIn, dispatch]);

  const {id} = useParams();
  const [course, setCourse] = useState<Course>();
  
  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/${id}`).then(res => {
      setCourse(res.data);
      setSelectedOptions(res.data.category[0].split(","));
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
    e.preventDefault()
    
    const form = new FormData();
    if (name !== "") form.append("name", name);
    if (description !== "") form.append("description", description);
    if (image !== "") form.append("image", image);
    if (video !== "") form.append("video", video);
    if (specialty !== "") form.append("specialty", specialty);
    form.append("category", selectedOptions.join(","));
    form.append("active", active ? "1" : "0");

    let request = new XMLHttpRequest();
    request.open('PATCH', `${Constants.API_URL}courses/${id}`);
    request.setRequestHeader("Bearer", `${userState.data?.access_token}`)
    request.send(form);
  }

  function handleAddImage(e: any) {
    setImage(e.target.files[0])
  }
  
  return (
    <Flex w="100%">
      <Sidebar />
      <Box w="100%">
        <Header>
        <HStack justifyContent="space-between">
          <BackButton />
          <Box>
            <Button colorScheme="green" size={"lg"} leftIcon={<Plus />}>Adicionar uma turma</Button>
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
                <Input type="text" onChange={(e) => setName(e.target.value)} placeholder={course?.name}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea onChange={(e) => setDescription(e.target.value)} placeholder={course?.description} />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Especialidade</FormLabel>
                <Input type="text" onChange={(e) => setSpecialty(e.target.value)} placeholder={course?.specialty}/>
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
                <Input type="text" onChange={(e) => setVideo(e.target.value)} placeholder={course?.video}/>
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Imagem do curso (apenas PNG, GIF, JPEG e JPG)</FormLabel>
                <Input
                  type="file"
                  name="file"
                  onChange={(e) => handleAddImage(e)}
                  placeholder={course?.image}
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
