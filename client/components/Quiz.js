import React, { useState } from 'react';
import {
  Flex, Box, Stack, Badge, Button, ButtonGroup, IconButton,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
  Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { RiNumbersFill } from "react-icons/ri";
import { BiSolidCategoryAlt  } from "react-icons/bi";
import { PiGaugeBold } from "react-icons/pi";
import { BsUiRadios } from "react-icons/bs";

const Quiz = ({ quizObject }) => {
  const quizExample = {questionNumber: 10, category: 'any', difficulty: 'any', questionType: 'any', data: [{"type":"multiple","difficulty":"hard","category":"Politics","question":"Who is the only US president to serve two non-consecutive terms in office?","correct_answer":"Grover Cleveland","incorrect_answers":["James K. Polk","Franklin D. Roosevelt","Thomas Jefferson"]},{"type":"multiple","difficulty":"medium","category":"Celebrities","question":"Who is &quot;James Rolfe&quot; better known as?","correct_answer":"The Angry Video Game Nerd","incorrect_answers":["TotalBiscuit","PeanutButterGamer","PewDiePie"]},{"type":"multiple","difficulty":"easy","category":"Entertainment: Video Games","question":"Who stars in Brutal Legend?","correct_answer":"Jack Black","incorrect_answers":["Kanye West","Lemmy","Ozzy Osbourne"]},{"type":"multiple","difficulty":"easy","category":"Art","question":"Who painted &quot;Swans Reflecting Elephants&quot;, &quot;Sleep&quot;, and &quot;The Persistence of Memory&quot;?","correct_answer":"Salvador Dali","incorrect_answers":["Jackson Pollock","Vincent van Gogh","Edgar Degas"]},{"type":"boolean","difficulty":"medium","category":"Geography","question":"Liechtenstein does not have an airport.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"medium","category":"Entertainment: Video Games","question":"What was the name of the Secret Organization in the Hotline Miami series? ","correct_answer":"50 Blessings","incorrect_answers":["American Blessings","50 Saints","USSR&#039;s Blessings"]},{"type":"multiple","difficulty":"hard","category":"General Knowledge","question":"Which of the following  British Monarchs never appeared on a circulated pound sterling coin?","correct_answer":"Edward VIII","incorrect_answers":["Victoria","George VI","Charles II"]},{"type":"multiple","difficulty":"easy","category":"Entertainment: Video Games","question":"Which of the following is not a faction in Tom Clancy&#039;s The Division?","correct_answer":"CDC","incorrect_answers":["Cleaners","Last Man Batallion","Rikers"]},{"type":"multiple","difficulty":"easy","category":"Sports","question":"In golf, what name is given to a hole score of two under par?","correct_answer":"Eagle","incorrect_answers":["Birdie","Bogey","Albatross"]},{"type":"multiple","difficulty":"easy","category":"Entertainment: Film","question":"Which movie contains the quote, &quot;Say hello to my little friend!&quot;?","correct_answer":"Scarface","incorrect_answers":["Reservoir Dogs","Heat","Goodfellas"]}]};
  // const {questionNumber, category, difficulty, questionType, data} = quizObject;
  //const changeQuiz = (index) => setQuiz(data[index]);
  const {questionNumber, category, difficulty, questionType, data} = quizExample;
  const [quiz, setQuiz] = useState(data[0]);
  const changeQuiz = (index) => setQuiz(data[index]);
  
  return (
    <>
      <Box textAlign="right" py={4} mr={12}>
        <Popover w='400px'>
          <PopoverTrigger>
          <IconButton
            icon={<InfoIcon/>}
            variant="ghost"
          />
          </PopoverTrigger>
          <PopoverContent textAlign="left">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign='center' fontSize={24}><b>Quiz Form Results</b></PopoverHeader>
            <PopoverBody>
              <TableContainer>
                <Table variant='simple' fontSize={18}>
                  <Tbody height='10px'>
                    <Tr >
                      <Td textAlign='left' color='gray.600'><b>Question Number</b></Td>
                      <Td textAlign='center' color='purple.500'><b>{questionNumber}</b></Td>
                    </Tr>
                    <Tr>
                      <Td textAlign='left' color='gray.600'><b>Category</b></Td>
                      <Td textAlign='center' color='green.500'><b>{category.toUpperCase()}</b></Td>
                    </Tr>
                    <Tr>
                      <Td textAlign='left' color='gray.600'><b>Difficulty</b></Td>
                      <Td textAlign='center' color='red.500'><b>{difficulty.toUpperCase()}</b></Td>
                    </Tr>
                    <Tr>
                      <Td textAlign='left' color='gray.600'><b>Question Type</b></Td>
                      <Td textAlign='center' color='blue.500'><b>{questionType.toUpperCase()}</b></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            {/* <Flex >
              <Box w='60%' textAlign='center'>
                <Stack direction='column' >
                  <Tag w='100%' height='1.5rem' variant='outline' colorScheme='cyan'>
                    <TagLeftIcon boxSize='12px' as={RiNumbersFill} />
                    <TagLabel>Question Number</TagLabel>
                  </Tag>
                  <Tag w='100%' height='1.5rem' variant='outline' colorScheme='cyan'>
                    <TagLeftIcon boxSize='12px' as={BiSolidCategoryAlt} />
                    <TagLabel>Category</TagLabel>
                  </Tag>
                  <Tag w='100%' height='1.5rem' variant='outline' colorScheme='cyan'>
                    <TagLeftIcon boxSize='12px' as={PiGaugeBold} />
                    <TagLabel>Difficulty</TagLabel>
                  </Tag>
                  <Tag w='100%' height='1.5rem' variant='outline' colorScheme='cyan'>
                    <TagLeftIcon boxSize='12px' as={BsUiRadios} />
                    <TagLabel>Question Type</TagLabel>
                  </Tag>
                </Stack>
              </Box>
              <Box w='40%' textAlign='center'>
                <Stack direction='column' textAlign='center'>
                    <Tag ml='5%' w='95%' height='1.5rem' textAlign='center' variant='outline' colorScheme='facebook'>
                      <box w='100%' textAlign='center'>{questionNumber}</box>
                    </Tag>
                    <Tag ml='20%' w='80%' height='1.5rem' variant='outline' colorScheme='facebook'>
                      <TagLabel>{category.toUpperCase()}</TagLabel>
                    </Tag>
                    <Tag ml='20%' w='80%' height='1.5rem' variant='outline' colorScheme='facebook'>
                      <TagLabel>{difficulty}</TagLabel>
                    </Tag>
                    <Tag ml='20%' w='80%' height='1.5rem' variant='outline' colorScheme='facebook'>
                      <TagLabel>{questionType}</TagLabel>
                    </Tag>
                  </Stack>
              </Box>
            </Flex> */}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <Stack spacing={4} direction='row' align='center'>
        <Button colorScheme='teal' size='sm'>
          Button
        </Button>
        <Button colorScheme='teal' size='xs'>
          Button
        </Button>
        <Button colorScheme='teal' size='md'>
          Button
        </Button>
        <Button colorScheme='teal' size='lg'>
          Button
        </Button>
      </Stack>
    </>
  );
};

export default Quiz;