import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
type User = {
  email: string;
  password: string;
};

export default function Login() {
  const[user,setUser]= useState<User>({
   email:"", password:""
  })
  

  const nav= useNavigate()

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
          const{name,value}=e.target
          setUser({...user,[name]:value})
  }

  const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
   e.preventDefault();
   const { email, password } = user;
   if (email === "") {
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
    try{
      const res= await axios.post('http://localhost:3001/api/login',user)
      if(res.data)
      {
          window.localStorage.setItem('token',res.data.token)
          window.localStorage.setItem('user',res.data.username);
          toast.success("Login successful, redirecting to Dashboard page!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
         
          setTimeout(()=>{
            nav("/dashboard")
          },2000)
      }
      else{
        console.log("error logging in")
        alert("error logging in");
      }
    }
    catch(err){
         console.log(err)
         toast.error(`${err.response.data}`, {
          position: "top-center",
          theme: "colored",
        });
    }
  }
}
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
           <ToastContainer />
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input name="email" onChange={(e)=>handleChange(e)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input name="password" onChange={(e)=>handleChange(e)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Button
               onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Text align={'center'}>
                 Don't have an account? <Link onClick={()=>nav("/")} color={'blue.400'}>Create an account</Link>
                </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}