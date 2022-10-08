import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BackButton } from '../../Components/BackButton';
import { Header } from '../../Components/Header';
import { Sidebar } from '../../Components/Sidebar';

interface DataObject {
  [key: string]: any
}

export const CreateCourseMaterialAdmin = () => {
  const {id, classId} = useParams();
  const [filesInput, setFilesInput] = useState<any[]>([])
  const [files, setFiles] = useState<any[]>([])
  const userState = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
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

  function handleAddFile(e: any) { 
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setFiles(previouState => [...previouState, reader.result])
    }
    reader.readAsDataURL(file);
    
  }

  function handleAddFileInput(e: any) {
    e.preventDefault();
    
    setFilesInput([...filesInput, 
      <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"} key={filesInput.length}>
        <FormControl isRequired>
          <FormLabel>Material {filesInput.length + 1}</FormLabel>
          <Input type="file" name={`file-${filesInput.length}`} onChange={(handleAddFile)} required/>
        </FormControl>
      </Box>
    ])
  }

  function handleCreateCourseMaterial(e: any) {
    e.preventDefault();
    const data: DataObject = {};
    files.forEach((file, index) => {
      data[`file-${index}`] =  file;
    })

    const sendData = JSON.stringify(data);
    setLoading(true);
    setTimeout(() => {
      let xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          if (this.status === 201) {
            toast.success('Materiais adicionados!', {
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
            }, 3000)
          } else {
            setLoading(false)
            toast.error('Erro ao adicionar materiais!', {
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
      xhr.open('POST', `${Constants.API_URL}courses/${id}/class/${classId}/materials`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Bearer", `${userState.data?.access_token}`)
      xhr.send(sendData);
    }, 10)
    
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
            <Text fontSize={"2xl"}>Adicionar material para o curso e todas as turmas</Text>
          </Box>
          <VStack as="form" spacing={6} onSubmit={(e) => {handleCreateCourseMaterial(e)}}>
            {filesInput}
           <Button onClick={handleAddFileInput} >Adicionar outro material</Button>
            <Button
              type='submit'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              disabled={loading || filesInput.length === 0}
            >{loading ? "Fazendo upload" : "Adicionar material"}</Button>
          </VStack>
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
