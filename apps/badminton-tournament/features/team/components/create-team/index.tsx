import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { IPlayer } from '@libs/player';
import { Formik } from 'formik';
import SelectPlayer from '../../../../features/player/components/select-player';

interface CreateTeamProps {
  cta: string;
  players: IPlayer[];
  isCreating?: boolean;
  onCreateTeam: (player1: IPlayer, player2: IPlayer) => Promise<void>;
}

export default function CreateTeam({
  cta,
  onCreateTeam,
  players,
  isCreating,
}: CreateTeamProps) {
  return (
    <Box>
      <Formik
        initialValues={
          {
            player1: void 0,
            player2: void 0,
          } as { player1?: IPlayer; player2?: IPlayer }
        }
        onSubmit={(data, { resetForm }) => {
          console.log('submit', data);

          const { player1, player2 } = data;
          if (!player1 || !player2) {
            return;
          }
          onCreateTeam(player1, player2).finally(() => {
            resetForm();
          });
        }}
        validate={({ player1, player2 }) => {
          const errors: { player1?: string; player2?: string } = {};
          if (!player1) {
            errors.player1 = 'Required';
          }
          if (!player2) {
            errors.player2 = 'Required';
          }
          if (player1 === player2) {
            errors.player2 = 'Player 2 should be different from player 1';
          }
          return errors;
        }}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <SelectPlayer
                  label="Select player 1"
                  selectedPlayer={values.player1}
                  onSelectPlayer={(player) => {
                    setFieldValue('player1', player, true);
                  }}
                  players={players}
                />
                <FormErrorMessage>{errors.player1}</FormErrorMessage>
              </FormControl>
              <FormControl>
                {/* <Select id="playe2" name="player2">
                  {players
                    .filter((player) => player.id !== values.player1)
                    .map((player) => {
                      return (
                        <option
                          key={`player1-option-${player.id}`}
                          value={player.id}
                        >
                          {player.name}
                        </option>
                      );
                    })}
                </Select> */}
                <SelectPlayer
                  label="Select player 2"
                  selectedPlayer={values.player2}
                  onSelectPlayer={(player) => {
                    setFieldValue('player2', player, true);
                  }}
                  players={players}
                />
                <FormErrorMessage>{errors.player2}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isCreating}
              >
                {cta}
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
