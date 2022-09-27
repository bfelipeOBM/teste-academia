import Constants from "@/application/common/Constants";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { Box, Grid, GridItem, HStack, IconButton, Tooltip, Heading, Button, Link as ChakraLink} from "@chakra-ui/react";
import axios from "axios";
import { Eye, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
interface Material {
  id: number;
  course_id: number;
  file_url: string;
}

export const InfosCreateMaterialAdmin = () => {
  const {id} = useParams();
  const [materials, setMaterials] = useState<Material[]>([]);
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
  }, [userState.isLoggedIn, dispatch]);

  useEffect(() => {
    axios.get(`${Constants.API_URL}courses/${id}/material`, {
      headers: {
        Bearer: `${userState.data?.access_token}`
    }}).then(res => {
      setMaterials(res.data);
    })
  }, [])

  function handleDeleteMaterial(materialId: number) {
    axios.delete(`${Constants.API_URL}courses/${id}/material/${materialId}`, {
      headers: {
        Bearer: `${userState.data?.access_token}`
    }}).then(res => {
      setMaterials(materials.filter(material => material.id !== materialId));
    })
  }
  
  return (
    <div>
      <Grid templateColumns='repeat(4, 1fr)' minH={100} gap={6}>
        {materials?.map((material, index) => (
          
            <GridItem
              key={material.id}
              w='100%'
              bg='blue.500'
              borderRadius="16px"
              bgColor={"white"}
              overflow={"hidden"}
              border="1px solid #DCE2E6"
              p={4}
              position="relative">
              <Heading fontSize={"xl"}>Material de apoio {index + 1}</Heading>
              
              <Box position={"relative"} mt={4}>
              <HStack>
              <ChakraLink href={material.file_url} download={"Banana"} isExternal>  
                <Tooltip label="Visualizar material">
                  <IconButton
                    icon={<Eye size={30}/>}
                    colorScheme={"blue"}
                    // onClick={() => {handleDeleteBanner(banner.id)}}
                    aria-label="Visualizar material" />
                </Tooltip>
              </ChakraLink>
              <Tooltip label="Deletar material">
                <IconButton
                  icon={<Trash size={30}/>}
                  colorScheme={"red"}
                  onClick={() => {handleDeleteMaterial(material.id)}}
                  aria-label="Deletar material" />
              </Tooltip>
              </HStack>
            </Box>
            </GridItem>
        ))}
      </Grid>
      <Link to={`/admin/courses/${id}/material`}>
        <Button colorScheme={'green'}>Adicionar material de apoio</Button>
      </Link>
    </div>
  )
}