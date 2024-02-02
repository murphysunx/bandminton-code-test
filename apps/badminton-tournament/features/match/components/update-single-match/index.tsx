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
import { ISingleMatch } from '@libs/match';
import { Field, Formik } from 'formik';

interface UpdateSingleMatchProps {
  match: ISingleMatch;
  onUpdateMatch: (score1: number, score2: number) => void;
  isSubmitting?: boolean;
}

export default function UpdateSingleMatch({
  match,
  onUpdateMatch,
  isSubmitting,
}: UpdateSingleMatchProps) {
  const { player1, player2, player1Score, player2Score } = match;

  return (
    <Box>
      <Heading>
        Update {player1.name} vs {player2.name}
      </Heading>
      <Box mt={'2rem'}>
        <Formik
          initialValues={{
            score1: player1Score,
            score2: player2Score,
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
                  <FormLabel htmlFor={`${match.id}-${player1.id}-score`}>
                    {player1.name} score
                  </FormLabel>
                  <Field
                    as={Input}
                    id={`${match.id}-${player1.id}-score`}
                    name="score1"
                    type="number"
                    variant="filled"
                    defaultValue={player1Score}
                  />
                  <FormErrorMessage>{errors.score1}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.score2 && touched.score2}>
                  <FormLabel htmlFor={`${match.id}-${player2.id}-score`}>
                    {player2.name} score
                  </FormLabel>
                  <Field
                    as={Input}
                    id={`${match.id}-${player2.id}-score`}
                    name="score2"
                    type="number"
                    variant="filled"
                    defaultValue={player2Score}
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
