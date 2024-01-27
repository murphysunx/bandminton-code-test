'use client';

import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import MatchResultForm from '../../features/round/components/match-result-form';
import RoundTable from '../../features/round/components/table';
import { IMatchPlayerResult } from '../../features/round/interfaces';

export default function Dashboard() {
  const [matches, setMatches] = useState([
    {
      player1: {
        name: 'Player 1',
        score: 21,
      },
      player2: {
        name: 'Player 2',
        score: 19,
      },
    },
    {
      player1: {
        name: 'Player 3',
        score: 21,
      },
      player2: {
        name: 'Player 4',
        score: 19,
      },
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = (
    result1: IMatchPlayerResult,
    result2: IMatchPlayerResult
  ) => {
    setMatches([
      ...matches,
      {
        player1: result1,
        player2: result2,
      },
    ]);
    onClose();
  };

  const existingPlayers = matches
    .map((match) => [match.player1.name, match.player2.name])
    .flat();

  return (
    <Center>
      <Box>
        <Heading size="xl">Dashboard</Heading>
        <RoundTable name={'Round 1'} results={matches} />
        <Button size="md" onClick={onOpen}>
          Add
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading as="h2" size="xl">
                Add a match result
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <MatchResultForm
                onSave={handleSave}
                onCancel={onClose}
                existingPlayers={existingPlayers}
              />
            </ModalBody>

            {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
