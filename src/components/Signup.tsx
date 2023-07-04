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
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import axios from 'axios';
import { useNavigate } from 'react-router-dom';

  type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const[user,setUser]= useState<User>({
      firstName:"", lastName:"", email:"", password:""
    })
    const nav= useNavigate()
    
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            const{name,value}=e.target
            setUser({...user,[name]:value})
    }

    const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
     e.preventDefault();
     const { firstName, lastName, email, password } = user
     if (firstName === "") {
      alert("firstName field is required");
    } else if (lastName === "") {
      alert("lastName field is required");
    } else if (email === "") {
      alert("email field is required");
    } else if (!email.includes("@")) {
      alert("please enter valid email Address");
    } else if (password === "") {
      alert("password field is required");
    } else if (password.length < 5) {
      alert("password length should be greater than five");
    } else {
      console.log("data added successfully");
      try{
        const res= await axios.post('http://localhost:3001/api/signup',user)
        console.log(res.data)
        if(res.data)
        {
         setTimeout(()=>{
          nav("/login")
        },500)
        }
        else{
          alert("signup failed, please try again");
        }
      }
      catch(err){
           console.log(err)
           alert("signup failed, please try again");
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
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" onChange={(e)=>handleChange(e)} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" onChange={(e)=>handleChange(e)} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" onChange={(e)=>handleChange(e)} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input name="password" onChange={(e)=>handleChange(e)} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
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
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link onClick={()=>nav("/login")} color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }