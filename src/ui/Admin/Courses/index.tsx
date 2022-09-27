import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { Box, Button, Grid, GridItem, Image, Heading, HStack, Text, VStack, IconButton, AspectRatio, Tooltip, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { Eye, PencilLine, Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "../Components/Header";
import { Course } from "../interface/course";

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseToDelete, setCourseToDelete] = useState<Course>();
  const { isOpen, onOpen, onClose } = useDisclosure()
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

  useEffect(() => {
    axios.get(`${Constants.API_URL}courses`).then(res => {
      setCourses(res.data);
    })
  }, [])

  function handleDeleteButton(course: Course) {
    setCourseToDelete(course);
    onOpen();
  }

  function handleDeleteCourse() {
    axios.delete(`${Constants.API_URL}courses/${courseToDelete?.id}`, {
      headers: {
        'Bearer': `${userState.data?.access_token}`
      }
    } ).then(res => {
      setCourses(courses.filter(course => course.id !== courseToDelete?.id));
      onClose();
    })
  }
  

  return (
    <VStack w="100%" bg={"gray.100"}>
      <Header>
        <HStack justifyContent="space-between">
          <Heading>Cursos</Heading>
          <Button
            as={Link}
            to="/admin/courses/create"
            colorScheme="green"
            size={"lg"}
            leftIcon={<Plus /> }>
              Adicionar um curso
          </Button>
        </HStack>
      </Header>
      <Box as="main" w={"100%"} maxW={1120} mx="auto">
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {courses.map(course => (
          <GridItem
            key={course.id}
            w='100%'
            bg='blue.500'
            borderRadius="16px"
            bgColor={"white"}
            overflow={"hidden"}
            border="1px solid #DCE2E6"
            position="relative">
          <AspectRatio ratio={16 / 9}>
            <Image src={course.image} objectFit="cover"/>
          </AspectRatio>
          <Box p={8}>
            <Heading size="lg">{course.name}</Heading>
            <Text>
              {course.upcoming_classes?.length ? `${course.upcoming_classes.length} turma(s)` : "Sem turmas"}
              </Text>
          </Box>
          <Box position={"absolute"} top={4} right={4}>
            <HStack>
              <Tooltip label="Visualizar informações do curso">
                <IconButton
                  as={Link}
                  to={`/admin/courses/${course.id}`}
                  icon={<Eye size={30}/>}
                  colorScheme={"gray"}
                  aria-label="Visualizar curso" />
              </Tooltip>
              <Tooltip label="Editar informações do curso">
                <IconButton
                  as={Link}
                  to={`/admin/courses/${course.id}/edit`}
                  icon={<PencilLine size={30}/>}
                  colorScheme={"gray"}
                  aria-label="Editar curso" />
              </Tooltip>
              <Tooltip label="Deletar curso">
                <IconButton
                  icon={<Trash size={30}/>}
                  colorScheme={"red"}
                  aria-label="Deletar curso"
                  onClick={() => handleDeleteButton(course)} />
              </Tooltip>
            </HStack>
          </Box>
        </GridItem>
        ))}
      </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Deseja excluir o curso <Text as="strong">{courseToDelete?.name}</Text>? e todas as turmas relacionados a ele?
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme='red' onClick={handleDeleteCourse}>Deletar curso</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}