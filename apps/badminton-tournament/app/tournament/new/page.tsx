'use client';
import { Box, Container, Heading, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import CreateTournament from '../../../features/tournament/components/create-tournament';
import { useCreateTournament } from '../../../features/tournament/core/hooks/create-tournament';

export default function TournamentNew() {
  const { isFetching, error, createTournament, tournament } =
    useCreateTournament();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (tournament) {
      toast({
        title: 'Success',
        description: `${tournament.name} has been created successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast, tournament]);

  return (
    <Container maxW="2xl" padding={'5rem'}>
      <Box>
        <Heading>Create a new tournament</Heading>
      </Box>
      <Box mt="1rem">
        <CreateTournament
          isSubmitting={isFetching}
          onSubmit={createTournament}
        />
      </Box>
    </Container>
  );
}
