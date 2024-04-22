import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Flex, Spacer, Box, Heading, Stack, Center, Badge, Button, ButtonGroup, IconButton, useDisclosure,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
  Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton, Progress,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { BiSolidLeftArrow, BiSolidRightArrow  } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const quizObject = useSelector((state) => state.quiz.quizObject);
  const BACKEND_URL = 'http://localhost:3000';
  const navigate = new useNavigate();
  const quizExample = {questionNumber: 5, category: 'geography', difficulty: 'easy', questionType: 'any', data:[{"type":"multiple","difficulty":"easy","category":"Geography","question":"Which Russian oblast forms a border with Poland?","correct_answer":"Kaliningrad","incorrect_answers":["Samara","Nizhny Novgorod","Omsk"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Vatican City is a country.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What is the capital of Indonesia?","correct_answer":"Jakarta","incorrect_answers":["Bandung","Medan","Palembang"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Alaska is the largest state in the United States.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"Geography","question":"What country has a horizontal bicolor red and white flag?","correct_answer":"Monaco","incorrect_answers":["Bahrain","Malta","Liechenstein"]}]};
  const {questionNumber, category, difficulty, questionType, data} = quizObject;
  // const changeQuiz = (index) => setQuiz(data[index]);
  // const {questionNumber, category, difficulty, questionType, data} = quizExample;
  const [quizIndex, setQuizIndex] = useState(0);
  const [quiz, setQuiz] = useState(data[0]);
  const [buttonBorderColor, setButtonBorderColor] = useState(['0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset']);
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const [options, setOptions] = useState(shuffleArray([quiz.correct_answer].concat(quiz.incorrect_answers)));
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  const handleChoice = (index) => {
    const newButtonBorder = [];
    for (let i=0; i<4; i++) {
      if (i === index) newButtonBorder.push('0px 0px 0px 8px #DD6B20 inset');
      else newButtonBorder.push('0px 0px 0px 0px #DD6B20 inset');
    }
    setButtonBorderColor(newButtonBorder);
    setCurrentAnswer(options[index]);
  }

  const handleNextQuestion = () => {
    console.log('handle next question');
    if (currentAnswer) {
      console.log(currentAnswer);
      if (quizIndex < questionNumber) {
        setUserAnswers(userAnswers.toSpliced(quizIndex, 1, currentAnswer));
        console.log(userAnswers);
        setCurrentAnswer('');
      }
      if (quizIndex+1 < questionNumber) {
        setQuizIndex(quizIndex+1);
        setQuiz(data[quizIndex+1]);
        setButtonBorderColor(['0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset', '0px 0px 0px 0px #DD6B20 inset']);
        setOptions(shuffleArray([data[quizIndex+1].correct_answer].concat(data[quizIndex+1].incorrect_answers)));
      } else {
        submitAnswerOpen();
      }
    } else {
      console.log('empty answer');
      answerEmptyOpen();
    }
  }

  const checkAnswers = () => {
    let counting = 0;
    for (const [index, currentAnswer] of userAnswers.entries()) {
      if (currentAnswer.toLowerCase() === data[index].correct_answer.toLowerCase()) counting++;
      console.log(currentAnswer, data[index].correct_answer, index);
    }
    fetch(BACKEND_URL + '/quiz/storeResult', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },// user questionNumber, category, difficulty, questionType, dataArray, answerArray, correctCount
      body: JSON.stringify({
        questionNumber, category, difficulty, questionType, dataArray: data, answerArray: userAnswers, correctCount: counting
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log('LoginForm fetch /signUp: Error: ', err));
    setCorrectCount(counting);
    submitAnswerClose();
    checkAnswerOpen();
  }
  //testing
  const { isOpen: answerEmptyIsOpen, onOpen: answerEmptyOpen, onClose: answerEmptyClose } = useDisclosure();
  const cancelAnswerEmptyRef = React.useRef();

  const { isOpen: submitAnswer, onOpen: submitAnswerOpen, onClose: submitAnswerClose } = useDisclosure();
  const cancelSubmitAnswerRef = React.useRef();

  const { isOpen: checkAnswer, onOpen: checkAnswerOpen, onClose: checkAnswerClose } = useDisclosure();
  const cancelCheckAnswerRef = React.useRef();

  return (
    <Flex width="full" align="center" justifyContent="center" p={8} h="100vh">
      <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg"> {/*width='31rem' borderWidth='1px' borderRadius='lg' overflow='hidden' */}
        <Flex width="full" align="center" justifyContent="center">
          <Box textAlign="center" w='80%' pl='18%'>
            <Heading color='orange.500'>Quiz {quizIndex+1}/{questionNumber}</Heading>
          </Box>
          <Box textAlign="right" pl='10%'>
            <Popover w='400px'>
              <PopoverTrigger>
                <IconButton
                  icon={<InfoIcon size={36}/>}
                  color='orange.500'
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
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Question Number</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='purple.500' width='10px'><b>{questionNumber}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Category</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='green.500'><b>{category.toUpperCase()}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Difficulty</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='red.500'><b>{difficulty.toUpperCase()}</b></Td>
                        </Tr>
                        <Tr>
                          <Td pl='5px' pr='5px' textAlign='left' color='gray.600'><b>Question Type</b></Td>
                          <Td pl='5px' pr='5px' textAlign='left' color='blue.500'><b>{questionType.toUpperCase()}</b></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
        <Progress my={8} colorScheme='orange' value={(quizIndex+1)*100/questionNumber} />
        <Flex width='full' spacing={5} my={8} align="center" justifyContent="center">
          <Badge w='25%' fontSize={14} textAlign='center' variant='solid' colorScheme='green'>{quiz.category}</Badge>
          <Spacer />
          <Badge w='25%' fontSize={14} textAlign='center' variant='solid' colorScheme='red'>{quiz.difficulty}</Badge>
          <Spacer />
          <Badge w='25%' fontSize={14} textAlign='center' variant='solid' colorScheme='purple'>{quiz.type}</Badge>
        </Flex>
        {/*test.map(()=> (<Progress mt={4} colorScheme='orange' value={(quizIndex+1)*100/questionNumber} />))*/}
        <Center my={4} textAlign="left" width='30rem' bg='orange.500' py={3} pl={3.5} pr={3.5} borderRadius={10}>
          <Box textAlign="left" w='30rem' bg='white' p={2} borderRadius={6} h='8rem'>
            <b>{quiz.question}</b>
          </Box>
        </Center>
        <Flex width='full' my={8} align="center" justifyContent="center">
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[0]} colorScheme='whatsapp' _active={{transform: 'scale(0.9)'}} onClick={() => handleChoice(0)}>
            <b>{options[0]}</b>
          </Button>
          <Spacer />
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[1]} colorScheme='twitter'_active={{transform: 'scale(0.9)'}} onClick={() => handleChoice(1)}>
            <b>{options[1]}</b>
          </Button>
        </Flex>
        <Flex width='full' my={8} align="center" justifyContent="center">
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[2]} colorScheme='purple' _active={{transform: 'scale(0.9)'}} onClick={() => handleChoice(2)}>
            <b>{options[2]}</b>
          </Button>
          <Spacer />
          <Button height='48px' width='48.5%' fontSize={20} boxShadow={buttonBorderColor[3]} colorScheme='pink' _active={{transform: 'scale(0.9)'}} onClick={() => handleChoice(3)}>
            <b>{options[3]}</b>
          </Button>
        </Flex>
        <Flex width='full' my={8} align="center" justifyContent="center">
          <IconButton borderRightRadius={0} height='48px' width='50%' fontSize={20} colorScheme='gray' icon={<BiSolidLeftArrow />} _active={{transform: 'scale(0.9)'}} />
          <IconButton borderLeftRadius={0} height='48px' width='50%' fontSize={20} colorScheme='gray' icon={<BiSolidRightArrow />} _active={{transform: 'scale(0.9)'}} onClick={() => handleNextQuestion()} />
        </Flex>
      </Box>

      {/* Empty Answer Alert */}
      <AlertDialog motionPreset='scale' leastDestructiveRef={cancelAnswerEmptyRef} onClose={answerEmptyClose} isOpen={answerEmptyIsOpen} isCentered >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Empty Answer?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Please select an answer to proceed.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelAnswerEmptyRef} onClick={answerEmptyClose}>
              Got it!
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Answer Alert */}
      <AlertDialog motionPreset='scale' leastDestructiveRef={cancelSubmitAnswerRef} onClose={submitAnswerClose} isOpen={submitAnswer} isCentered >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Submit Answers?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Double-check your answers, for once you submit, there's no turning back!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelSubmitAnswerRef} onClick={submitAnswerClose}>
              Nah
            </Button>
            <Button colorScheme='green' ref={cancelAnswerEmptyRef} onClick={() => checkAnswers()} ml={3}>
              Sure thing!
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Answer Result Modal */}
      <Modal isOpen={checkAnswer} onClose={checkAnswerClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You got {correctCount} out of {questionNumber} correct!
            That's a perfect score!
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {navigate('/quizform')}}>
              New Quiz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
  );
  /* <Flex >
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
  </Flex> */
};

export default Quiz;