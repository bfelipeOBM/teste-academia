import { Box, Flex } from "@chakra-ui/react";

interface HeaderProps {
  children: React.ReactNode;
}

export const Header = ({children} : HeaderProps) => (
  <Flex as="header" w={"100%"} maxH={24} h={24} bg={"whiteAlpha.900"} borderBottom="1px solid #DCE2E6" alignItems={"center"} px={8}>
    <Box w={"100%"} maxW={1120} mx="auto">
      {children}
    </Box>
  </Flex>
)