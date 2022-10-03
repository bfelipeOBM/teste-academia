import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { AspectRatio, Box, Button, Checkbox, Flex, Grid, GridItem, Heading, HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";

interface Banner {
  id: number;
  url: string;
  active: boolean;
}

export const BannersInfoAdmin = () => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [bannerToDeleteId, setBannerToDeleteId] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    axios.get(`${Constants.API_URL}banners/`).then((response) => {
      setBanners(response.data)
    })
  }, [])

  function handleUpdateBannerActive(e: any, banner_id: number) {
    const options = {
      method: 'PATCH',
      url: `${Constants.API_URL}banners/${banner_id}`,
      headers: {
        'Content-Type': 'application/json',
        Bearer: `${userState.data?.access_token}`
      },
      data: { active: e.target.checked }
    };

    axios.request(options)

    const updatedBanners = banners?.map(banner => {
      if (banner.id === banner_id) {
        banner.active = e.target.checked
      }
      return banner
    })
    setBanners(updatedBanners)
  }

  function handleDeleteBanner(banner_id: any) {
    setBannerToDeleteId(banner_id);
    onOpen();
  }

  function handleDeleteBannerConfirm() {
    axios.delete(`${Constants.API_URL}banners/${bannerToDeleteId}`, {
      headers: {
        'Bearer': `${userState.data?.access_token}`
      }
    }).then(res => {
      setBanners(banners.filter(banner => banner.id !== bannerToDeleteId));
      onClose();
    })
  }

  return (
    <Flex w="100%">
      <Sidebar />
      <Box w="100%">
        <Header>
          <HStack justifyContent="space-between">
            <Heading>Banners</Heading>
            <Box>
              <Button
                as={Link}
                to="/admin/banners/create"
                colorScheme="green"
                size={"lg"}
                leftIcon={<Plus />}>Adicionar Banner</Button>
            </Box>
          </HStack>
        </Header>
        <Box w="100%" maxW={1120} mx="auto">
          <Box py={8}>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              {banners?.map(banner => (
                <GridItem
                  key={banner.id}
                  w='100%'
                  bg='blue.500'
                  borderRadius="16px"
                  bgColor={"white"}
                  overflow={"hidden"}
                  border="1px solid #DCE2E6"
                  position="relative">
                  <AspectRatio ratio={16 / 9}>
                    <Image src={banner.url} objectFit="cover" />
                  </AspectRatio>
                  <Box p={8}>
                    <Text as="span">Ativo: </Text>
                    <Checkbox mt={4}
                      defaultChecked={banner.active}
                      onChange={(e) => handleUpdateBannerActive(e, banner.id)} />
                  </Box>
                  <Box position={"absolute"} top={4} right={4}>
                    <HStack>
                      <Tooltip label="Deletar turma">
                        <IconButton
                          icon={<Trash size={30} />}
                          colorScheme={"red"}
                          onClick={() => { handleDeleteBanner(banner.id) }}
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
          <ModalHeader>Deletar banner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deseja deletar o banner?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant={'outline'} mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme={'red'} onClick={handleDeleteBannerConfirm}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
