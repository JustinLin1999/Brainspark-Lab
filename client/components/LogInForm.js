import React, { useState } from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Button, Spacer } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogInForm = () => {
  const BACKEND_URL = 'http://localhost:3000';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const navigate = useNavigate();
  const handleView = () => setShow(!show);
  const handleLogin = async () => {
    if (!username) setUsernameEmpty(true);
    if (!password) setPasswordEmpty(true);
    if(username && password) {
      console.log('start sign in');
      try {
        const loginResult = await axios.post(BACKEND_URL + '/user/signIn', {username, password}, {withCredentials: true});
        console.log(loginResult);
        if (loginResult.result === 'Not Found') {
          navigate('/login');
        } else {
          navigate('/quizform');
        }
      } catch (err) {console.log('LoginForm fetch /signIn: Error: ', err)}
    }
  };
  const handleSignUp = async () => {
    if (!username) setUsernameEmpty(true);
    if (!password) setPasswordEmpty(true);
    if(username && password) {
      console.log('start sign up');
      try {
        const signUpResult = await axios.post(BACKEND_URL + '/user/signUp', {username, password}, {withCredentials: true});
        console.log(signUpResult);
        navigate('/quizform');
      } catch (err) {console.log('LoginForm fetch /signUp: Error: ', err)}
    }
  };
  const handleGuest = () => {
    navigate('/quizform');
  };

  return (
    <Flex width="full" align="center" justifyContent="center" p={8}>
      <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg"> {/*width='31rem' borderWidth='1px' borderRadius='lg' overflow='hidden' */}
        <Box textAlign="center">
          <Heading color='teal.300'>Login</Heading>
        </Box>
        <Box my={4} textAlign="left" width='30rem'>
          <form>
            <FormControl isRequired isInvalid={isUsernameEmpty}>
              <FormLabel color='teal.300'>Username or Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <EmailIcon color='teal.300' />
                </InputLeftElement>
                <Input color='teal.400' focusBorderColor='teal.300' type="email" placeholder="test@test.com"
                onChange={e => setUsername(e.currentTarget.value)} onFocus={() => setUsernameEmpty(false)} />
              </InputGroup>
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl mt={6} isRequired isInvalid={isPasswordEmpty}>
              <FormLabel color='teal.300'>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LockIcon color='teal.300' />
                </InputLeftElement>
                <Input color='teal.400' focusBorderColor='teal.300' type={show ? 'text' : 'password'} placeholder="*******"
                onChange={e => setPassword(e.currentTarget.value)} onFocus={() => setPasswordEmpty(false)} />
                <InputRightElement width='4.5rem'>
                  <Button _hover={{ bg: 'gray.100' }} bg='white' color='teal.300' h='1.75rem' size='sm' width='3.75rem' onClick={handleView}>
                    {show ? <ViewIcon /> : <ViewOffIcon />}
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