import {
  Box,
  Button,
  ButtonGroup,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MAX_MATCH_SCORE, MIN_MATCH_SCORE } from '../../core/constants';
import { validateMatchResultForm } from '../../core/validator';
import { IMatchPlayer } from '../../interfaces';

interface MatchResultFormProps {
  onSave: (result1: IMatchPlayer, result2: IMatchPlayer) => void;
  onCancel: () => void;
  roundPlayers?: string[];
}

export default function MatchResultForm({
  onSave,
  onCancel,
  roundPlayers = [],
}: MatchResultFormProps) {
  const toast = useToast();
  const [player1, setPlayer1] = useState<IMatchPlayer>({
    name: '',
    score: 0,
  });
  const [player2, setPlayer2] = useState<IMatchPlayer>({
    name: '',
    score: 0,
  });

  const handleSave = () => {
    if (validateMatchResultForm(player1, player2, roundPlayers)) {
      onSave(player1, player2);
    } else {
      toast({
        title: 'Invalid form.',
        description: 'Invalid form. Please check again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Stack>
        <Box>
          <Stack spacing={3}>
            <Input
              placeholder="Player 1's name"
              size="md"
              onChange={(e) => {
                const newPlayer = e.target.value;
                if (roundPlayers && roundPlayers.indexOf(newPlayer) === -1) {
                  setPlayer1({
                    ...player1,
                    name: e.target.value,
                  });
                } else {
                  toast({
                    title: 'Player already exists.',
                    description: `${newPlayer} already exists. Please choose another.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            />
            <NumberInput
              min={MIN_MATCH_SCORE}
              max={MAX_MATCH_SCORE}
              onChange={(_, n) => {
                setPlayer1({
                  ...player1,
                  score: n,
                });
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={3}>
            <Input
              placeholder="Player 2's name"
              size="md"
              onChange={(e) => {
                const newPlayer = e.target.value;
                if (roundPlayers && roundPlayers.indexOf(newPlayer) === -1) {
                  setPlayer2({
                    ...player2,
                    name: e.target.value,
                  });
                } else {
                  toast({
                    title: 'Player already exists.',
                    description: `${newPlayer} already exists. Please choose another.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            />
            <NumberInput
              min={MIN_MATCH_SCORE}
              max={MAX_MATCH_SCORE}
              onChange={(_, n) => {
                setPlayer2({
                  ...player2,
                  score: n,
                });
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </Box>
      </Stack>
      <ButtonGroup mt={'1rem'} variant="outline" spacing="6">
        <Button
          colorScheme="blue"
          size="md"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </Box>
  );
}
