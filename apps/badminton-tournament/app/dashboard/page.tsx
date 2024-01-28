'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import EdiblePlayerList from '../../features/player/components/edible-list';
import PlayerForm from '../../features/player/components/form';
import { IPerson } from '../../features/player/interfaces';
import RoundTable from '../../features/round/components/table';
import { validatePlayerName } from '../../features/round/core/validator';
// import { IRound } from '../../features/round/interfaces';
import { useNextRound } from '../../features/tournament/core';
import { isReadyToStart } from '../../features/tournament/core/validators';

export default function Dashboard() {
  const toast = useToast();
  const {
    isOpen: isAddPlayerModalOpen,
    onOpen: onOpenAddPlayerModal,
    onClose: onCloseAddPlayerModal,
  } = useDisclosure();
  const [started, setStarted] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPerson[]>([]);
  // const [rounds, setRounds] = useState<IRound[]>([]);

  const { isFetching, error, matches, getNextRound } = useNextRound();

  const handleAddPlayer = (name: string) => {
    if (
      validatePlayerName(
        name,
        players.map((player) => player.name)
      )
    ) {
      setPlayers([...players, { name }]);
      toast({
        title: 'Player added.',
        description: `Player ${name} added successfully.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Invalid player name.',
        description: 'Invalid player name. Please check again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleRemovePlayer = (name: string) => {
    setPlayers(players.filter((player) => player.name !== name));
  };

  const start = () => {
    setStarted(true);
    getNextRound(
      players.map((player) => ({
        name: player.name,
        wins: 0,
        points: 0,
        history: [],
      }))
    );
  };

  return (
    <Center>
      <Flex rowGap={'1rem'} direction={'column'}>
        <Heading size="xl">Tournament</Heading>
        {!started && (
          <Box>
            <Text>Please add at least 4 players</Text>
            {players.length > 0 && (
              <EdiblePlayerList
                players={players}
                onRemovePlayer={handleRemovePlayer}
              />
            )}
            <ButtonGroup mt={'1rem'} variant="outline" spacing="6">
              <Button size={'md'} onClick={onOpenAddPlayerModal}>
                Add player
              </Button>
              {isReadyToStart(players) && (
                <Button colorScheme="teal" size={'md'} onClick={start}>
                  Start
                </Button>
              )}
            </ButtonGroup>
            <Modal
              isOpen={isAddPlayerModalOpen}
              onClose={onCloseAddPlayerModal}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Heading as="h2" size="xl">
                    Add a player
                  </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <PlayerForm
                    onAddPlayer={handleAddPlayer}
                    onCancel={onCloseAddPlayerModal}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        )}

        {started && isFetching && <Text>Loading...</Text>}
        {started && error && <Text>{error}</Text>}
        {started && !error && matches && (
          <Box>
            <Text>Round 1</Text>
            <RoundTable
              name="Round 1"
              matches={matches.map((match) => {
                return {
                  player1: {
                    name: match[0],
                    score: void 0,
                  },
                  player2: {
                    name: match[1],
                    score: void 0,
                  },
                };
              })}
            ></RoundTable>
          </Box>
        )}
      </Flex>
    </Center>
  );
}
