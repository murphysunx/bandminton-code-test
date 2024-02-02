import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { IDoubleMatch } from '@libs/match';
import { Field, Formik } from 'formik';

interface UpdateDoubleMatchProps {
  match: IDoubleMatch;
  onUpdateMatch: (score1: number, score2: number) => void;
  isSubmitting?: boolean;
}

export default function UpdateDoubleMatch({
  match,
  onUpdateMatch,
  isSubmitting,
}: UpdateDoubleMatchProps) {
  const { team1, team2, team1Score, team2Score } = match;

  return (
    <Box>
      <Heading>
        Update {match.team1.player1.name + ' & ' + match.team1.player2.name} vs{' '}
        {match.team2.player1.name + ' & ' + match.team2.player2.name}
      </Heading>
      <Box mt={'2rem'}>
        <Formik
          initialValues={{
            score1: team1Score,
            score2: team2Score,
          }}
          onSubmit={(values) => {
            const { score1, score2 } = values;
            if (score1 !== void 0 && score2 !== void 0) {
              onUpdateMatch(score1, score2);
            }
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.score1 && touched.score1}>
                  <FormLabel htmlFor={`${match.id}-${team1.id}-score`}>
                    {match.team1.player1.name +
                      ' & ' +
                      match.team1.player2.name}
                    score
                  </FormLabel>
                  <Field
                    as={Input}
                    id={`${match.id}-${team1.id}-score`}
                    name="score1"
                    type="number"
                    variant="filled"
                    defaultValue={team1Score}
                  />
                  <FormErrorMessage>{errors.score1}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.score2 && touched.score2}>
                  <FormLabel htmlFor={`${match.id}-${team2.id}-score`}>
                    {match.team2.player1.name +
                      ' & ' +
                      match.team2.player2.name}
                    score
                  </FormLabel>
                  <Field
                    as={Input}
                    id={`${match.id}-${team2.id}-score`}
                    name="score2"
                    type="number"
                    variant="filled"
                    defaultValue={team2Score}
                  />
                  <FormErrorMessage>{errors.score2}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  width="full"
                  isLoading={isSubmitting}
                >
                  Update
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
