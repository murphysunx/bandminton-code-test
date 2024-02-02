import { Select } from '@chakra-ui/react';
import { ISingleMatch } from '@libs/match';

interface SelectSingleMatchProps {
  selectedMatch?: ISingleMatch;
  matches: ISingleMatch[];
  onSelectMatch: (match: ISingleMatch) => void;
}

export default function SelectSingleMatch({
  selectedMatch,
  matches,
  onSelectMatch,
}: SelectSingleMatchProps) {
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
            key={`single-match-option-${idx}`}
            value={match.id}
            onClick={() => onSelectMatch(match)}
          >
            {match.player1.name} vs {match.player2.name}
          </option>
        );
      })}
    </Select>
  );
}
