import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { CreatePlayerPayload, IPlayer } from '@libs/player';
import CreatePlayer from '../../../../features/player/components/create-player';
import SelectPlayer from '../../../../features/player/components/select-player';
import { useState } from 'react';

interface EnrolTournamentPlayersProps {
  players: IPlayer[];
  availablePlayers: IPlayer[];
  isEnrolling?: boolean;
  onEnrolPlayer: (player: IPlayer) => Promise<void>;
  onEnrolNewPlayer: (player: CreatePlayerPayload) => Promise<void>;
}

export default function EnrolTournamentPlayers({
  players,
  availablePlayers,
  isEnrolling,
  onEnrolPlayer,
  onEnrolNewPlayer,
}: EnrolTournamentPlayersProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | undefined>();

  return (
    <Box
      padding={'1rem'}
      border={'2px solid'}
      borderRadius={'1rem'}
      borderColor={players.length % 2 === 0 ? 'green' : 'orange'}
    >
      <Box>
        <Heading mb={'1rem'}>Enrolled players</Heading>
        {players.length === 0 && <Box>No players</Box>}
        {players.length > 0 && (
          <List spacing={3}>
            {players.map((player) => {
              return (
                <ListItem key={'enrolled-player-' + player.id}>
                  👤 {player.name}
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
      <Flex columnGap={'5rem'}>
        {availablePlayers && availablePlayers.length > 0 && (
          <Box mt={'1rem'}>
            <Heading mb={'1rem'} size={'md'}>
              Enrol an exisiting player
            </Heading>
            <SelectPlayer
              label={'Select player'}
              players={availablePlayers}
              selectedPlayer={selectedPlayer}
              onSelectPlayer={(player) => {
                setSelectedPlayer(player);
              }}
            />
            <Button
              mt={'1rem'}
              isLoading={isEnrolling}
              // variant={'outline'}
              width={'full'}
              colorScheme="purple"
              onClick={() => {
                if (!selectedPlayer) {
                  return;
                }
                onEnrolPlayer(selectedPlayer);
              }}
            >
              Enrol
            </Button>
          </Box>
        )}
        <Box mt={'1rem'}>
          <Heading mb={'1rem'} size={'md'}>
            Enrol a new player
          </Heading>
          <CreatePlayer
            cta="Enrol"
            onCreatePlayer={onEnrolNewPlayer}
            isSubmitting={isEnrolling}
          ></CreatePlayer>
        </Box>
      </Flex>
      {players.length % 2 === 1 && (
        <Box mt={'1rem'}>
          <Text color={'orange'}>Player number should be even.</Text>
        </Box>
      )}
    </Box>
  );
}
