'use client';
import React, { useState } from 'react';
import {
  Flex, Box, Heading, FormControl, FormLabel, FormErrorMessage, Button, Spacer, Icon,
  Input, InputGroup, InputLeftElement, InputRightElement, useToast
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';

const LogInForm = () => {
  const BACKEND_URL = 'http://localhost:3001';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleView = () => setShowPassword(!showPassword);
  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!username) setUsernameEmpty(true);
    if (!password) setPasswordEmpty(true);
    if(username && password) {
      console.log('start sign in');
      try {
        const loginResult = await axios.post(BACKEND_URL + '/user/signIn', {username, password, email}, {withCredentials: true});
        console.log(loginResult);
        router.push('/quizform');
      } catch (err: any) {
        console.log('LoginForm fetch /signIn: Error: ', err);
        if (err.response.data.err === 'User not found.' || err.response.data.err === 'Invalid credentials.') {
          toast.closeAll();
          toast({
            position: 'top',
            title: 'Login Failed',
            description: (<p>Username or Password incorrect.<br />You can sign up or try again later.</p>),
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: 'top',
            title: 'Error Occurred',
            description: "Something went wrong when signing in.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };
  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!username) setUsernameEmpty(true);
    if (!password) setPasswordEmpty(true);
    if (!email) setEmailEmpty(true);
    if(username && password && email) {
      console.log('start sign up');
      try {
        const signUpResult = await axios.post(BACKEND_URL + '/user/signUp', {username, password, email}, {withCredentials: true});
        console.log(signUpResult);
        router.push('/quizform');
      } catch (err: any) {
        console.log('LoginForm fetch /signUp: Error: ', err);
        if (err.response.data.err === 'username already exists in database') {
          toast.closeAll();
          toast({
            position: 'top',
            title: 'Error Occurred',
            description: "Please choose a different username.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: 'top',
            title: 'Error Occurred',
            description: "Something went wrong when signing in.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };
  const handleGuest = () => {router.push('/quizform')};

  return (
    <Flex width="100%" align="center" justifyContent="center" p={8} height="100vh">
      <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg"> 
        <Box textAlign="center">
          <Heading color='teal.300'>Login</Heading>
        </Box>
        <Box my={4} textAlign="left" width='30rem'>
          <form>
            <FormControl isRequired isInvalid={isUsernameEmpty}>
              <FormLabel color='teal.300'>Username</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Icon as={FaUser} color='teal.300' />
                </InputLeftElement>
                <Input color='teal.400' focusBorderColor='teal.300' type="text" placeholder="username"
                onChange={e => setUsername(e.currentTarget.value)} onFocus={() => setUsernameEmpty(false)} />
              </InputGroup>
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl mt={6} isInvalid={isEmailEmpty}>
              <FormLabel color='teal.300'>Email (Required for Sign up)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <EmailIcon color='teal.300' />
                </InputLeftElement>
                <Input color='teal.400' focusBorderColor='teal.300' type="email" placeholder="test@test.com"
                onChange={e => setEmail(e.currentTarget.value)} onFocus={() => setEmailEmpty(false)} />
              </InputGroup>
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl mt={6} isRequired isInvalid={isPasswordEmpty}>
              <FormLabel color='teal.300'>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LockIcon color='teal.300' />
                </InputLeftElement>
                <Input color='teal.400' focusBorderColor='teal.300' type={showPassword ? 'text' : 'password'} placeholder="*******"
                onChange={e => setPassword(e.currentTarget.value)} onFocus={() => setPasswordEmpty(false)} />
                <InputRightElement width='4.5rem'>
                  <Button _hover={{ bg: 'gray.100' }} bg='white' color='teal.300' h='1.75rem' size='md' width='3.75rem' onClick={handleView}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Button color='teal.300' _hover={{ bg: 'gray.100' }} bg='white' border='1px' borderColor='#ccd0d5' width="full" mt={4} type="submit" onClick={handleLogin}>
              Sign In
            </Button>
            <Flex>
              <Box w='49%'>
                <Button color='teal.300' _hover={{ bg: 'gray.100' }} bg='white' border='1px' borderColor='#ccd0d5' width="full" mt={4} type="submit" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </Box>
              <Spacer />
              <Box w='49%'>
                <Button color='teal.300' _hover={{ bg: 'gray.100' }} bg='white' border='1px' borderColor='#ccd0d5' width="full" mt={4} type="submit" onClick={handleGuest}>
                  As Guest
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LogInForm;
