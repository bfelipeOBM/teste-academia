import Constants from '@/application/common/Constants';
import { ApplicationState } from '@/application/store';
import { userProfile } from '@/application/store/profile/action';
import { Flex, HStack, Button, Box, Text, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BackButton } from '../Components/BackButton';
import { Header } from '../Components/Header';
import { Sidebar } from '../Components/Sidebar';


export const CreateBannerAdmin = () => {
  const [image, setImage] = useState<any>("")
  const [link, setLink] = useState<any>(null);
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

  function handleAddImage(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      setImage(reader.result)
    }
    reader.readAsDataURL(file);
  }

  function handleCreateBanner(e: any) {
    e.preventDefault()
    const data = JSON.stringify({"file": image, "link": e.target.link.value});
    setLoading(true)
    let xhr = new XMLHttpRequest();
    // setTimeout(() => {
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          setLoading(false)
          if (this.status === 201) {
            toast.success('Banner adicionado!', {
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
            toast.error('Erro ao adicionar banner!', {
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
      xhr.open("POST", `${Constants.API_URL}banners/`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Bearer", `${userState.data?.access_token}`)
      
      xhr.send(data);
    // }, 5000)
  }


  return (
    <Flex w="100%"  flexDir={['column', 'row']}>
      <Sidebar />
      <Box w="100%" px={8}>
        <Header>
          <HStack justifyContent="space-between">
            <BackButton />
          </HStack>
        </Header>

        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Text fontSize={"2xl"}>Adicionar banner</Text>
          </Box>
          <VStack as="form" spacing={6} onSubmit={handleCreateBanner}>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Banner (apenas PNG, GIF, JPEG e JPG)</FormLabel>
                <Input type="file" name="file" onChange={(e) => handleAddImage(e)} required />
              </FormControl>
            </Box>
            <Box borderWidth={1} borderStyle={"solid"} p={4} borderRadius={8} w={"100%"}>
              <FormControl>
                <FormLabel>Link</FormLabel>
                <Input type="url" name="link"  />
              </FormControl>
            </Box>
            <Button
              type='submit'
              colorScheme="green"
              w={"full"}
              size={"lg"}
              disabled={loading}
              // onClick={(e) => { handleCreateBanner(e) }}
            >{loading ? "Fazendo upload" : "Adicionar banner"}</Button>
          </VStack>
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
