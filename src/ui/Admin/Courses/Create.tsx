import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, Textarea, VStack, Checkbox, Grid } from '@chakra-ui/react';
import { Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '../Components/BackButton';
import { Header } from '../Components/Header';
import { Sidebar } from '../Components/Sidebar';

export const CreateCourseAdmin = () => {
  const options = ["Eletricista", "Pedreiro", "Mestre de Obras", "Encanador", "Empreiteiro", "Técnico em construção civil/edificações", "Hidráulico", "Azulejista", "Arquiteto", "Assentador de pisos", "Marceneiro", "Pintor", "Engenheiro"]

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [video, setVideo] = useState("")
  const [image, setImage] = useState("")
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


  function handleAddCategory(e: any) {
    const category = e.target.value
    if (selectedOptions.includes(category)) {
      setSelectedOptions(selectedOptions.filter(item => item !== category))
    } else {
      setSelectedOptions([...selectedOptions, category])
    }
  }

  function handleAddImage(e: any) {
    setImage(e.target.files[0])
  }

  function handleCreateCourse(e: any) {
    e.preventDefault()

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("image", image);
    form.append("video", video);
    form.append("short_video", "Banana");
    form.append("specialty", specialty);
    form.append("category", selectedOptions.join(","));
    form.append("active", "true");
    let request = new XMLHttpRequest();
    request.open('POST', `${Constants.API_URL}courses`);
    request.setRequestHeader("Bearer", `${userState.data?.access_token}`)
    request.send(form);
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
                <Input type="text" onChange={(e) => setName(e.target.value)} required />
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
              <FormLabel>Categoria</FormLabel>
              <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {options.map((value) => (
                  <Checkbox
                    value={value}
                    onChange={(e) => handleAddCategory(e)}
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
              onClick={(e) => { handleCreateCourse(e) }}
            >Criar curso</Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
