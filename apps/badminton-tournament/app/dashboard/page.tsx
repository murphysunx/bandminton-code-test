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
import { validatePlayerName } from '../../features/round/core/validator';
import { IRound } from '../../features/round/interfaces';
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
  const [rounds, setRounds] = useState<IRound[]>([]);

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
        {/* <RoundOverview
          name="Round 1"
          results={matches}
          onAddMatchResult={handleAddMatchResult}
        ></RoundOverview> */}
      </Flex>
    </Center>
  );
}
