import {
  Box,
  Button,
  ButtonGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MAX_MATCH_SCORE, MIN_MATCH_SCORE } from '../../core/constants';
import { IMatch, IMatchPlayer } from '../../interfaces';

interface EditMatchResultProps {
  match: IMatch;
  onSave: (score1: number, score2: number) => void;
  onCancel: () => void;
}

export default function EditMatchResult({
  match,
  onSave,
  onCancel,
}: EditMatchResultProps) {
  const { player1, player2 } = match;
  const [player1Score, setPlayer1Score] = useState<number | undefined>(
    player1.score
  );
  const [player2Score, setPlayer2Score] = useState<number | undefined>(
    player2.score
  );
  const [error, setError] = useState<string | undefined>(void 0);

  const handleUpdateScore = (player: IMatchPlayer, updated: number) => {
    if (player === player1) {
      setPlayer1Score(updated);
    } else if (player === player2) {
      setPlayer2Score(updated);
    } else {
      setError('Unknown player');
    }
  };

  const handleSave = () => {
    try {
      onSave(player1Score!, player2Score!);
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    }
  };

  return (
    <Box>
      <NumberInput
        placeholder="player 1's score"
        max={MAX_MATCH_SCORE}
        min={MIN_MATCH_SCORE}
        onChange={(_, score) => handleUpdateScore(player1, score)}
        isInvalid={!!error}
        isRequired
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <NumberInput
        placeholder="player 2's score"
        max={MAX_MATCH_SCORE}
        min={MIN_MATCH_SCORE}
        onChange={(_, score) => handleUpdateScore(player2, score)}
        isInvalid={!!error}
        isRequired
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {error && <Text color={'red'}>{error}</Text>}
      <ButtonGroup>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </Box>
  );
}
