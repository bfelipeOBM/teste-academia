import Constants from "@/application/common/Constants";
import { Box, Grid, GridItem, HStack, IconButton, Tooltip, Link, Heading, Button} from "@chakra-ui/react";
import axios from "axios";
import { Eye, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Material {
  id: number;
  course_id: number;
  file_url: string;
}

export const InfosCreateMaterialAdmin = () => {
  const {id} = useParams();
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    axios.get(`${Constants.API_URL}/courses/${id}/material`).then(res => {
      setMaterials(res.data);
    })
  }, [])
  
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
              <Link href={material.file_url} download={"Banana"} isExternal>  
                <Tooltip label="Visualizar material">
                  <IconButton
                    icon={<Eye size={30}/>}
                    colorScheme={"blue"}
                    // onClick={() => {handleDeleteBanner(banner.id)}}
                    aria-label="Visualizar material" />
                </Tooltip>
                </Link>
                <Tooltip label="Deletar material">
                  <IconButton
                    icon={<Trash size={30}/>}
                    colorScheme={"red"}
                    // onClick={() => {handleDeleteBanner(banner.id)}}
                    aria-label="Deletar material" />
                </Tooltip>
              </HStack>
            </Box>
            </GridItem>
          
        ))}

      </Grid>
      <Button colorScheme={'green'}>Adicionar material de apoio</Button>
    </div>
  )
}