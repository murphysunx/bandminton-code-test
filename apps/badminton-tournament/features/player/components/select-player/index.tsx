import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { IPlayer } from '@libs/player';
import * as uuid from 'uuid';

interface SelectPlayerProps {
  label: string;
  selectedPlayer?: IPlayer;
  players: IPlayer[];
  onSelectPlayer: (player: IPlayer) => void;
}

export default function SelectPlayer({
  label,
  selectedPlayer,
  players,
  onSelectPlayer,
}: SelectPlayerProps) {
  const selectId = uuid.v1();
  const onSelect = (playerId: number) => {
    const player = players.find((player) => player.id === playerId);
    if (!player) {
      return;
    }
    onSelectPlayer(player);
  };

  return (
    <FormControl>
      <FormLabel htmlFor={`select-player-${selectId}`}>{label}</FormLabel>
      <Select
        id={`select-player-${selectId}`}
        name={label}
        onChange={(e) => {
          onSelect(parseInt(e.target.value));
        }}
        value={selectedPlayer?.id}
      >
        <option value={''}>NULL</option>
        {players.map((player) => {
          return (
            <option
              key={`select-player-${selectId}-option-${player.id}`}
              value={player.id}
            >
              {player.name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
}
