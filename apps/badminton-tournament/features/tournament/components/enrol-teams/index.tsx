import { Box, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { CreatePlayerPayload, IPlayer } from '@libs/player';
import { TournamentTeams } from '@libs/team';
import CreateTeam from '../../../../features/team/components/create-team';
import CreatePlayer from '../../../../features/player/components/create-player';

interface EnrolTournamentTeamsProps {
  teams: TournamentTeams;
  availablePlayers: IPlayer[];
  isSubmitting?: boolean;
  onEnrolTeam: (player1: IPlayer, player2: IPlayer) => Promise<void>;
  onCreateNewPlayer: (name: CreatePlayerPayload) => Promise<void>;
}

export default function EnrolTournamentTeams({
  teams,
  availablePlayers,
  onEnrolTeam,
  isSubmitting,
  onCreateNewPlayer,
}: EnrolTournamentTeamsProps) {
  console.log('enrol teams');

  return (
    <Flex columnGap={'5rem'}>
      <Box>
        <Box
          padding={'1rem'}
          border={'2px solid'}
          borderRadius={'1rem'}
          borderColor={'green'}
        >
          <Heading mb={'1rem'}>Register new player</Heading>
          <CreatePlayer
            cta="Register new player"
            isSubmitting={isSubmitting}
            onCreatePlayer={onCreateNewPlayer}
          />
        </Box>
      </Box>
      <Box
        flexGrow={'1'}
        padding={'1rem'}
        border={'2px solid'}
        borderRadius={'1rem'}
        borderColor={teams && teams.length % 2 === 0 ? 'green' : 'orange'}
      >
        <Box>
          <Heading mb={'1rem'}>Enrolled teams</Heading>
          {teams.length === 0 && <Box>No teams</Box>}
          {teams.length > 0 && (
            <List spacing={3}>
              {teams.map((team) => {
                return (
                  <ListItem key={'enrolled-team-' + team.id}>
                    👥 {team.player1.name} & {team.player2.name}
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
        {availablePlayers && availablePlayers.length > 0 && (
          <Box mt={'1rem'}>
            <Heading mb={'1rem'} size={'md'}>
              Enrol team
            </Heading>
            <CreateTeam
              cta="Enrol"
              players={availablePlayers}
              onCreateTeam={onEnrolTeam}
              isCreating={isSubmitting}
            ></CreateTeam>
          </Box>
        )}
        {teams && teams.length % 2 === 1 && (
          <Box mt={'1rem'}>
            <Text color={'orange'}>Team number should be even.</Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
