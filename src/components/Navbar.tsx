import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const userlogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
   nav("/login");
  };
  const isDashboardPage = location.pathname === "/dashboard";
  const name= localStorage.getItem("user")
  return (
    <Flex  alignItems='center' justifyContent="space-around" px={5} w="100%" h="80px"  bgColor={"#8f86d4"}>
    <Box>
      <Text as="h5" fontSize="xl" fontWeight="bold" mb={2} color='black'  ><Text as='i' color='white'>Welcome  </Text> {name}</Text>
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
