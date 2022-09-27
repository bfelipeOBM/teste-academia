import { Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const Sidebar = () => {
  return (
    <Box w={"120px"} bg={"#EF7F00"} minH={"100vh"} h={"auto"}  display={"flex"} flexDir={"column"} textAlign={"center"} alignItems={"center"} justifyContent={"center"}>
      <Text fontSize={"2xl"}>
        <Link to={"/admin/"}>
          Cursos
        </Link>
      </Text>
      <Text fontSize={"2xl"}>
        <Link to={"/admin/users"}>
          Usuários
        </Link>
      </Text>
      <Text fontSize={"2xl"}>
        <Link to={"/admin/banners"}>
          Banners
        </Link>
      </Text>
    </Box>
  )
}