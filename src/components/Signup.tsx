import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = user;
    if (firstName === "") {
      toast.error("firstName field is required", {
        position: "top-center",
        theme: "colored",
      });
    } else if (lastName === "") {
      toast.error("lastName field is required", {
        position: "top-center",
        theme: "colored",
      });
    } else if (email === "") {
      toast.error("email field is required", {
        position: "top-center",
        theme: "colored",
      });
    } else if (!email.includes("@")) {
      toast.error("please enter valid email address", {
        position: "top-center",
        theme: "colored",
      });
    } else if (password === "") {
      toast.error("password field is required", {
        position: "top-center",
        theme: "colored",
      });
    } else if (password.length < 5) {
      toast.error("password length should be greater than five", {
        position: "top-center",
        theme: "colored",
      });
    } else {
      try {
        const res = await axios.post("http://localhost:3001/api/signup", user);
        console.log(res.data);
        if (res.data) {
          toast.success("Signup uccessful, redirecting to Login page!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          setTimeout(() => {
            nav("/login");
            // alert("signup successful, redirecting to login pGE");
          }, 2000);
        }
      } catch (err) {
        if (err?.response.data) {
          toast.error(`${err?.response.data}, Login instead`, {
            position: "top-center",
            theme: "colored",
          });
          //  alert();
        }
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <ToastContainer />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>

          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                onChange={(e) => handleChange(e)}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  onChange={(e) => handleChange(e)}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link onClick={() => nav("/login")} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
