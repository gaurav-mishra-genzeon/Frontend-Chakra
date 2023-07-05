import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const history = useNavigate();
  const userlogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };
  const isDashboardPage = location.pathname === "/dashboard";
  return (
    <Flex  alignItems='center' justifyContent="space-around"  w="100%" h="80px"  bgColor={"#8f86d4"}>
    <Box>
      <Text as="h5" color={"white"} fontSize="xl" fontWeight="bold" mb={2}>Notes Application</Text>
    </Box>
    <Spacer />
    {isDashboardPage && (
   <Button onClick={userlogout}   _hover={{ bg: "#6657da", color: " white" }}  colorScheme='#B9B9B9' variant='solid'  border="1px"
   borderColor={"white"} >
    Logout
     </Button>)}
    </Flex>
   
  )
}
