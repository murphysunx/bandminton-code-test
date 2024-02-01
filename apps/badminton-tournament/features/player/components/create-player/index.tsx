import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { CreatePlayerPayload } from '@libs/player';
import { Field, Formik } from 'formik';

interface CreatePlayerProps {
  cta: string;
  onCreatePlayer: (data: CreatePlayerPayload) => Promise<void>;
  isSubmitting?: boolean;
}

export default function CreatePlayer({
  cta,
  onCreatePlayer,
  isSubmitting,
}: CreatePlayerProps) {
  return (
    <Box>
      <Formik
        initialValues={
          {
            name: '',
          } as CreatePlayerPayload
        }
        onSubmit={(data, { resetForm }) => {
          onCreatePlayer(data).finally(() => {
            resetForm();
          });
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Player name</FormLabel>
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
                {cta}
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
