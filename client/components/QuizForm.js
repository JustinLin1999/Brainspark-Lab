import React, { useState } from 'react';
import { Flex, Box, Stack, Heading, FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Button, Icon } from '@chakra-ui/react';
import {
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  SliderFilledTrack, SliderTrack, Slider, SliderThumb, Select, Radio, RadioGroup, Checkbox, CheckboxGroup
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { RiNumbersFill } from "react-icons/ri";
import { BiSolidCategoryAlt  } from "react-icons/bi";
import { PiGaugeBold } from "react-icons/pi";
import { BsUiRadios } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
//import { response } from 'express';

const QuizForm = ({ setQuizObject }) => {
  const [questionNumber, setQuestionNumber] = useState(10);
  const [category, setCategory] = useState('any');
  const [difficulty, setDifficulty] = useState('any');
  const [questionTypes, setQuestionTypes] = useState([true, false, false]);
  const questionType = ['any', 'multiple', 'boolean'].filter((el, i) => questionTypes[i])[0];
  const navigate = useNavigate();
  const handleStartQuiz = event => {
    event.preventDefault();
    let apiString = 'https://opentdb.com/api.php?';
    console.log(questionNumber);
    console.log(category);
    console.log(difficulty);
    console.log(questionType);
    apiString += `amount=${questionNumber}`;
    apiString += category !== 'any' ? `&category=${category}` : '';
    apiString += difficulty !== 'any' ? `&difficulty=${difficulty}` : '';
    apiString += questionTypes[1] ? '&type=multiple' : questionTypes[2] ? '&type=boolean' : '';
    console.log(apiString);

    fetch(apiString)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.response_code === 0) {
          setQuizObject({questionNumber, category, difficulty, questionType, data: data.results});
          navigate('/quiz');
        }
      })
      .catch(err => console.log('QuizForm fetch api Error: ', err));
  };

  return (
    <Flex width="full" align="center" justifyContent="center" p={8}>
     <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg"> {/*width='31rem' borderWidth='1px' borderRadius='lg' overflow='hidden' */}
        <Box textAlign="center">
          <Heading color='teal.300'>Quiz Option</Heading>
        </Box>
        <Box my={4} textAlign="left" width='30rem'>
          <form>
            <FormControl>
              <FormLabel color='teal.300'>Number of Questions</FormLabel>
              <Flex>
                <InputGroup width='2.5rem'>
                  <InputLeftElement pointerEvents='none'>
                    <Icon boxSize={5} color='teal.300' as={RiNumbersFill} />
                  </InputLeftElement>
                  <Input width='0rem' pr='0' />
                </InputGroup>
                <NumberInput focusBorderColor='teal.300' maxW='200px' mr='1.5rem' min={1} max={50} value={questionNumber} onChange={(questionNumber) => setQuestionNumber(Math.round(questionNumber))} allowMouseWheel>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper>
                      <AddIcon boxSize={2.5} />
                    </NumberIncrementStepper>
                    <NumberDecrementStepper>
                      <MinusIcon boxSize={2.5} />
                    </NumberDecrementStepper>
                  </NumberInputStepper>
                </NumberInput>
                <Slider flex='1' focusThumbOnChange={false} value={questionNumber} onChange={(questionNumber) => setQuestionNumber(questionNumber)} min={1} max={50}>
                  <SliderTrack>
                    <SliderFilledTrack bg='teal.300' />
                  </SliderTrack>
                  <SliderThumb fontSize='sm' boxSize='32px' children={questionNumber} />
                </Slider>
              </Flex>
            </FormControl>

            {/* Category */}
            <FormControl mt={6}>
              <FormLabel color='teal.300'>Category</FormLabel>
              <Flex>
                <InputGroup width='2.5rem'>
                  <InputLeftElement pointerEvents='none'>
                    <Icon boxSize={5} color='teal.300' as={BiSolidCategoryAlt }/>
                  </InputLeftElement>
                  <Input width='0rem' pr='0' />
                </InputGroup>
                <Select focusBorderColor='teal.300' defaultValue={'any'} onChange={(e) => setCategory(e.target.value)}>
                  <option value="any">Any Category</option>
                  <option value="9">General Knowledge</option>
                  <option value="10">Entertainment: Books</option>
                  <option value="11">Entertainment: Film</option>
                  <option value="12">Entertainment: Music</option>
                  <option value="13">Entertainment: Musicals &amp; Theatres</option>
                  <option value="14">Entertainment: Television</option>
                  <option value="15">Entertainment: Video Games</option>
                  <option value="16">Entertainment: Board Games</option>
                  <option value="17">Science &amp; Nature</option>
                  <option value="18">Science: Computers</option>
                  <option value="19">Science: Mathematics</option>
                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politics</option>
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                  <option value="27">Animals</option>
                  <option value="28">Vehicles</option>
                  <option value="29">Entertainment: Comics</option>
                  <option value="30">Science: Gadgets</option>
                  <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                  <option value="32">Entertainment: Cartoon &amp; Animations</option>
                </Select>
              </Flex>
            </FormControl>
            
            {/* Difficulty */}
            <FormControl mt={6}>
              <FormLabel color='teal.300'>Difficulty</FormLabel>
              <Flex>
                <InputGroup width='2.5rem'>
                  <InputLeftElement pointerEvents='none'>
                    <Icon boxSize={5} color='teal.300' as={PiGaugeBold}/>
                  </InputLeftElement>
                  <Input width='0rem' pr='0' />
                </InputGroup>
                <Box borderWidth='1px' borderRadius='md' p={1.5} width='100%'>
                  <RadioGroup onChange={setDifficulty} value={difficulty} ml={3} >
                    <Stack direction='row' spacing={10} >
                      <Radio value='any' colorScheme='teal'>Any</Radio>
                      <Radio value='easy' colorScheme='teal'>Easy</Radio>
                      <Radio value='medium' colorScheme='teal'>Medium</Radio>
                      <Radio value='hard' colorScheme='teal'>Hard</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Flex>
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            
            {/* Question Type */}
            <FormControl mt={6}>
              <FormLabel color='teal.300'>Question Type</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Icon boxSize={5} color='teal.300' as={BsUiRadios} />
                </InputLeftElement>
                <Input width='0rem' pr='0' />
                <Box spacing={10} borderWidth='1px' borderRadius='md' p={1.5} width='100%'>
                  <Stack direction='row' spacing={10} ml={3} >
                    <Checkbox colorScheme='teal' isChecked={questionTypes[0]} onChange={() => setQuestionTypes([true, false, false])}>
                      Any
                    </Checkbox>
                    <Checkbox colorScheme='teal' isChecked={questionTypes[1]} onChange={() => setQuestionTypes([false, true, false])}>
                      Multiple Choice
                    </Checkbox>
                    <Checkbox colorScheme='teal' isChecked={questionTypes[2]} onChange={() => setQuestionTypes([false, false, true])}>
                      True / False
                    </Checkbox>
                  </Stack>
                </Box>
              </InputGroup>
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>

            {/* Start Quiz */}
            <Button color='white' _hover={{ bg: 'gray.100', color:'teal.300' }} bg='teal.300' border='1px' borderColor='#ccd0d5' width="full"
            mt={6} type="submit" onClick={handleStartQuiz}>
              <b>S t a r t&nbsp;&nbsp;&nbsp;&nbsp;Q u i z !</b>
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default QuizForm;