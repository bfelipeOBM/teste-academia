import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BackButton } from '../../../Components/BackButton';
import { Header } from '../../../Components/Header';
import { Sidebar } from '../../../Components/Sidebar';

interface DataObject {
  [key: string]: any
}

export const CreateCertificateClass = () => {
  const {id, classId} = useParams();
  const [filesInput, setFilesInput] = useState<any[]>([])
  const [files, setFiles] = useState<any[]>([])
  const [nomes, setNomes] = useState<any[]>([])
  const [cargos, setCargos] = useState<any[]>([])
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
    console.log(e.target.name)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setFiles(previouState => [...previouState, `${e.target.name}-banana-${reader.result}`])
    }
    reader.readAsDataURL(file);
  }

  function handleAddNome(e: any) {
    setNomes(previouState => [...previouState, `${e.target.name}-banana-${e.target.value}`])
  }

  function handleAddCargo(e: any) {
    setCargos(previouState => [...previouState, `${e.target.name}-banana-${e.target.value}`])
  }

  function handleAddFileInput(e: any) {
    e.preventDefault();
    
    setFilesInput([...filesInput, 
      <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"} key={filesInput.length}>
        <FormControl isRequired>
          <VStack gap={6}>
            <Input type="text" placeholder="Nome do parceiro" name={`nome-${filesInput.length}`}/>
            <Input type="text" placeholder="Cargo do parceiro" name={`cargo-${filesInput.length}`}/>
            <Box w={'full'}>
              <FormLabel>Assinatura</FormLabel>
              <Input type="file" name={`assinatura-${filesInput.length}`} onChange={(handleAddFile)} required/>
            </Box>
            <Box w={'full'}>
              <FormLabel>Logo da empresa</FormLabel>
              <Input type="file" name={`logo-${filesInput.length}`} onChange={(handleAddFile)} required/>
            </Box>
          </VStack>
        </FormControl>
      </Box>
    ])
  }

  function handleCreateCourseMaterial(e: any) {
    e.preventDefault();

    const data: DataObject = {};
    files.forEach((file, index) => {
      const [name, value] = file.split('-banana-');
      data[name] = value;
    })

    const nomes = document.querySelectorAll('input[name^="nome-"]');
    nomes.forEach((nome: any, index) => {
      data[nome.name] = nome.value;
    })

    const cargos = document.querySelectorAll('input[name^="cargo-"]');
    cargos.forEach((cargo: any, index) => {
      data[cargo.name] = cargo.value;
    })

    const sendData = JSON.stringify(data);
    // console.log(sendData)
    setTimeout(() => {
      let xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          if (this.status === 201) {
            toast.success('Certificado gerado!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            });
            // setTimeout(() => {
            //   navigate(-1);
            // }, 3000)
          } else {
            setLoading(false)
            toast.error('Erro ao gerar o certificado!', {
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
      xhr.open('POST', `${Constants.API_URL}courses/${id}/class/2/certificate`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Bearer", `${userState.data?.access_token}`)
      xhr.send(sendData);
    }, 10)
  }

  return (
    <Flex w="100%" flexDir={['column', 'row']}>
      <Sidebar />
      <Box w="100%" px={8}>
        <Header>
        <HStack justifyContent="space-between">
        <BackButton />
        </HStack>
        </Header>
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Adicionar assinatura</Text>
          </Box>
          <VStack as="form" spacing={6} onSubmit={(e) => {handleCreateCourseMaterial(e)}}>
            {filesInput}
            {filesInput.length < 3 && <Button onClick={handleAddFileInput}>{filesInput.length > 0 ? 'Adicionar outra assinatura' : 'Adicionar assinatura'}</Button>}
            <Button
              type='submit'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              disabled={loading || filesInput.length === 0}
            >{loading ? "Gerando certificado" : "Gerar certificado"}</Button>
          </VStack>
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
