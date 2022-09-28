import { Box, VStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const Sidebar = () => {
  return (
    <Box w="200px">
      <Box w={"200px"} bg={"#EF7F00"} minH={"100vh"} position={"fixed"}>
        <VStack h={"100vh"} justifyContent="center" alignItems={"center"}>
          <Text fontSize={"2xl"}>
            <Link to={"/admin/"}>
              Cursos
            </Link>
          </Text>
          <Text as="p" fontSize={"2xl"}>
            <Link to={"/admin/users"}>
              Usuários
            </Link>
          </Text>
          <Text as="p" fontSize={"2xl"}>
            <Link to={"/admin/banners"}>
              Banners
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}
