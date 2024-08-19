import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Box, Button, Spacer, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Username from './loginFormContent/username';
import Email from './loginFormContent/email';
import Password from './loginFormContent/password';

const LogInFormContent = () => {
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

  const handleView = () => {setShowPassword(!showPassword)};
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
    <Box my={4} textAlign="left" width='30rem'>
      <form>

        {/* Username */}
        <Username setUsername={setUsername} isUsernameEmpty={isUsernameEmpty} setUsernameEmpty={setUsernameEmpty} />

        {/* Email */}
        <Email setEmail={setEmail} isEmailEmpty={isEmailEmpty} setEmailEmpty={setEmailEmpty} />

        {/* Password */}
        <Password setPassword={setPassword} isPasswordEmpty={isPasswordEmpty} setPasswordEmpty={setPasswordEmpty} showPassword={showPassword} handleView={handleView} />

        {/* Submit Button */}
        <Button color='teal.300' _hover={{ bg: 'gray.100' }} bg='white' border='1px' borderColor='#ccd0d5' width="full" mt={4} type="submit" onClick={handleLogin}>
          Sign In
        </Button>

        {/* Sign Up & As Guest */}
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
  )
}

export default LogInFormContent;