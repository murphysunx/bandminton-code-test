import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { CreateTournamentPayload, ITournament } from '@libs/tournament';
import { Field, Formik } from 'formik';

interface CreateTournamentProps {
  onSubmit: (data: CreateTournamentPayload) => Promise<ITournament | null>;
  isSubmitting?: boolean;
}

export default function CreateTournament({
  onSubmit,
  isSubmitting,
}: CreateTournamentProps) {
  return (
    <Flex align="center" justify="center">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={
            {
              name: '',
            } as CreateTournamentPayload
          }
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <FormLabel htmlFor="name">Tournament name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    validate={(value: string) => {
                      if (!value) {
                        return 'Required';
                      }
                    }}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  width="full"
                  isLoading={isSubmitting}
                >
                  Create
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
