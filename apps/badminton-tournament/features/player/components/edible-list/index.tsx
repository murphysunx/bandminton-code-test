import { Flex, IconButton, List, ListItem } from '@chakra-ui/react';
import { IPerson } from '../../interfaces';
import { CloseIcon } from '@chakra-ui/icons';

interface PlayerListProps {
  players: IPerson[];
  onRemovePlayer: (name: string) => void;
}

export default function EdiblePlayerList({
  players,
  onRemovePlayer,
}: PlayerListProps) {
  if (players.length === 0) {
    return <div>No players</div>;
  }

  return (
    <List>
      {players.map((player) => {
        return (
          <Flex
            key={`player-${player.name}`}
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={'1rem'}
          >
            <ListItem mr={'1rem'}>{player.name}</ListItem>
            <IconButton
              aria-label="remove player"
              icon={<CloseIcon />}
              onClick={() => {
                onRemovePlayer(player.name);
              }}
            />
          </Flex>
        );
      })}
    </List>
  );
}
