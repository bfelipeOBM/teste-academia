import { Flex } from "@chakra-ui/react";
import { Sidebar } from "./Components/Sidebar";
import { Courses } from "./Courses";

export const Admin = () => {
  return (
    <Flex w="100%">
      <Sidebar />
      <Courses />
    </Flex>
  );
};
