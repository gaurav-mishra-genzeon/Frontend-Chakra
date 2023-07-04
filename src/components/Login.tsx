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

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import {useContext} from 'react'
// import { AppContext } from './context/context'
type User = {
  email: string;
  password: string;
};

export default function Login() {
  const[user,setUser]= useState<User>({
   email:"", password:""
  })
  
  // const {setToken}= useContext(AppContext)
  
  const nav= useNavigate()

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
          const{name,value}=e.target
          setUser({...user,[name]:value})
  }

  const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
   e.preventDefault();
   const { email, password } = user;
   if (email === "") {
     alert("email field is required");
   } else if (!email.includes("@")) {
     alert("please enter valid email Address");
   } else if (password === "") {
     alert("password field is required");
   } else if (password.length < 5) {
     alert("password length should be greater than five");
   } else {
    try{
      const res= await axios.post('http://localhost:3001/api/login',user)
      // console.log(res.data)
      if(res.data)
      {
          window.localStorage.setItem('token',res.data.token)
          setTimeout(()=>{
            alert("login successful")
          },500) 

          setTimeout(()=>{
            nav("/dashboard")
          },1000)
      }
      else{
        console.log("error logging in")
        alert("error logging in");
      }
    }
    catch(err){
         console.log(err)
         alert("error logging in");
    }
  }
}
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
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
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}