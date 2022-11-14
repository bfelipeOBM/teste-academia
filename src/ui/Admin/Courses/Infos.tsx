import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { AspectRatio, Box, Button, Flex, Grid, GridItem, Heading, HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { Eye, PencilLine, Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BackButton } from "../Components/BackButton";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { Course } from "../interface/course";
import { InfosCreateMaterialAdmin } from "./Material/Infos";

export const CourseAdminInfos = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [classes, setClasses] = useState<any[]>([]);
  const [classToDelete, setClassToDelete] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();
  
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
    axios.get(`${Constants.API_URL}courses/${id}`).then(res => {
      setCourse(res.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/${id}/classes`).then(res => {
      setClasses(res.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course])

  function handleDeleteClass(classe: any) {
    setClassToDelete(classe);
    onOpen();
  }

  function handleDeleteClassConfirm() {
    axios.delete(`${Constants.API_URL}courses/${id}/classes/${classToDelete.class_id}`).then(res => {
      setClasses(classes.filter(classe => classe.class_id !== classToDelete.class_id));
      onClose();
    })
  }

  return (
    <Flex w="100%" flexDir={['column', 'row']}>
      <Sidebar />
      <Box w="100%" >
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
        <Box px={8}>
          <AspectRatio ratio={16 / 4}>
            <Image src={course?.image} objectFit="cover"/>
          </AspectRatio>
        </Box>
        <Box w="100%" maxW={1120} mx="auto" px={8}>
          <Box py={8}>
            <Heading fontSize={"6xl"}>{course?.name}</Heading>
            {course && <div dangerouslySetInnerHTML={{__html: course.description}} ></div>}
          </Box>
          <Box py={8}>
            <Heading fontSize={"4xl"}>Turmas</Heading>
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(4, 1fr)']} gap={6}>
        {classes.map(classe => (
          <GridItem
            key={classe.class_id}
            w='100%'
            bg='blue.500'
            borderRadius="16px"
            bgColor={"white"}
            overflow={"hidden"}
            border="1px solid #DCE2E6"
            position="relative">
          <AspectRatio ratio={16 / 9}>
            <Image src={classe.image} objectFit="cover"/>
          </AspectRatio>
          <Box p={8}>
            <Heading size="lg">{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(classe.date))}</Heading>
            <Text>
              {classe.students_count > 0 ? `${classe.students_count} aluno(s)` : "Sem alunos"}
              </Text>
          </Box>
          <Box position={"absolute"} top={4} right={4}>
            <HStack>
              <Tooltip label="Visualizar informações da turma">
                <IconButton
                  as={Link}
                  to={`/admin/courses/${id}/class/${classe.class_id}`}
                  icon={<Eye size={30}/>}
                  colorScheme={"gray"}
                  aria-label="Visualizar turma" />
              </Tooltip>
              <Tooltip label="Editar informações da turma">
                <IconButton
                  as={Link}
                  to={`/admin/courses/${id}/classes/${classe.class_id}/edit`}
                  icon={<PencilLine size={30}/>}
                  colorScheme={"gray"}
                  aria-label="Editar turma" />
              </Tooltip>
              <Tooltip label="Deletar turma">
                <IconButton
                  icon={<Trash size={30}/>}
                  colorScheme={"red"}
                  onClick={() => {handleDeleteClass(classe)}}
                  aria-label="Deletar turma" />
              </Tooltip>
            </HStack>
          </Box>
        </GridItem>
        ))}
      </Grid>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar turma</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja deletar a turma do dia <Text as="strong">{classToDelete && new Intl.DateTimeFormat('pt-BR').format(new Date(classToDelete.date))}</Text></Text>
          </ModalBody>

          <ModalFooter>
            <Button variant={'outline'} mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme={'red'} onClick={handleDeleteClassConfirm}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
