import { Select } from '@chakra-ui/react';
import { IDoubleMatch } from '@libs/match';

interface SelectDoubleMatchProps {
  selectedMatch?: IDoubleMatch;
  matches: IDoubleMatch[];
  onSelectMatch: (match: IDoubleMatch) => void;
}

export default function SelectSingleMatch({
  selectedMatch,
  matches,
  onSelectMatch,
}: SelectDoubleMatchProps) {
  return (
    <Select
      value={selectedMatch?.id}
      onChange={(e) => {
        const matchId = +e.target.value;
        const match = matches.find((match) => match.id === matchId);
        if (match) {
          onSelectMatch(match);
        }
      }}
    >
      {matches.map((match, idx) => {
        return (
          <option
            key={`double-match-option-${idx}`}
            value={match.id}
            onClick={() => onSelectMatch(match)}
          >
            {match.team1.player1.name + ' & ' + match.team1.player2.name} vs{' '}
            {match.team2.player1.name + ' & ' + match.team2.player2.name}
          </option>
        );
      })}
    </Select>
  );
}
