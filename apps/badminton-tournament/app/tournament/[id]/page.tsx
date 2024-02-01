'use client';
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { CreatePlayerPayload, IPlayer } from '@libs/player';
import { useEffect, useState } from 'react';
// import { useRegisterPlayer } from '../../../features/player/core/hooks/register-player';
import EnrolTournamentPlayers from '../../../features/tournament/components/enrol-players';
// import EnrolTournamentTeams from '../../../features/tournament/components/enrol-teams';
import {
  getTournamentNotReadyMessage,
  isTournamentReadyToStart,
} from '@libs/tournament';
import { useRegisterPlayer } from '../../../features/player/core/hooks/register-player';
import EnrolTournamentTeams from '../../../features/tournament/components/enrol-teams';
import { useEnrolNewPlayer } from '../../../features/tournament/core/hooks/enrol-new-player';
import { useEnrolPlayer } from '../../../features/tournament/core/hooks/enrol-player';
import { useEnrolTeam } from '../../../features/tournament/core/hooks/enrol-team';
import { useGetAvailablePlayers } from '../../../features/tournament/core/hooks/get-available-players';
import { useGetAvailableTeamPlayers } from '../../../features/tournament/core/hooks/get-available-team-players';
import { useGetEnrolledPlayers } from '../../../features/tournament/core/hooks/get-enrolled-players';
import { useGetEnrolledTeams } from '../../../features/tournament/core/hooks/get-enrolled-teams';
import { useGetTournament } from '../../../features/tournament/core/hooks/get-tournament';

export default function TournamentOverview({
  params,
}: {
  params: { id: number };
}) {
  const tournamentId = params.id;

  const { tournament, fetchTournament } = useGetTournament(tournamentId);

  const { enrolledPlayers, fetchEnrolledPlayers } =
    useGetEnrolledPlayers(tournamentId);

  const { enrolledTeams, fetchEnrolledTeams } =
    useGetEnrolledTeams(tournamentId);

  const { availableTeamPlayers, fetchAvailableTeamPlayers } =
    useGetAvailableTeamPlayers(tournamentId);

  const { availablePlayers, fetchAvailablePlayers } =
    useGetAvailablePlayers(tournamentId);

  const { registerPlayer } = useRegisterPlayer();
  const { enrolNewPlayer } = useEnrolNewPlayer(tournamentId);
  const { enrolPlayer } = useEnrolPlayer(tournamentId);

  const { enrolTeam } = useEnrolTeam(tournamentId);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isReadyToStart, setReadyToStart] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const [, players, teams] = await Promise.all([
          fetchTournament(),
          fetchEnrolledPlayers(),
          fetchEnrolledTeams(),
          fetchAvailablePlayers(),
          fetchAvailableTeamPlayers(),
        ]);
        setReadyToStart(isTournamentReadyToStart(players || [], teams || []));
      } catch (e) {
        setError((e as Error).message);
      }
    }

    fetchData().finally(() => setLoading(false));
  }, [
    fetchAvailablePlayers,
    fetchAvailableTeamPlayers,
    fetchEnrolledPlayers,
    fetchEnrolledTeams,
    fetchTournament,
    tournamentId,
  ]);

  const handleEnrolNewPlayer = async (playerData: CreatePlayerPayload) => {
    setLoading(true);
    try {
      await enrolNewPlayer(playerData);
      const players = await fetchEnrolledPlayers();
      setReadyToStart(
        isTournamentReadyToStart(players || [], enrolledTeams || [])
      );
      await fetchAvailablePlayers();
      await fetchAvailableTeamPlayers();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrolPlayer = async (player: IPlayer) => {
    setLoading(true);
    try {
      await enrolPlayer(player);
      const players = await fetchEnrolledPlayers();
      setReadyToStart(
        isTournamentReadyToStart(players || [], enrolledTeams || [])
      );
      await fetchAvailablePlayers();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrolTeam = async (player1: IPlayer, player2: IPlayer) => {
    setLoading(true);
    try {
      await enrolTeam(player1, player2);
      const teams = await fetchEnrolledTeams();
      setReadyToStart(
        isTournamentReadyToStart(enrolledPlayers || [], teams || [])
      );
      await fetchAvailableTeamPlayers();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewPlayer = async (playerData: CreatePlayerPayload) => {
    setLoading(true);
    try {
      await registerPlayer(playerData);
      await fetchAvailablePlayers();
      await fetchAvailableTeamPlayers();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!tournament) return <Text>Tournament not found</Text>;
  return (
    <Box padding={'5rem'}>
      <Heading>{tournament.name}</Heading>
      <Box mt={'1rem'}>
        <Button colorScheme={isReadyToStart ? 'purple' : 'orange'}>
          Start
        </Button>
        {!isReadyToStart && (
          <Text mt={'1rem'} color="orange">
            {getTournamentNotReadyMessage(
              enrolledPlayers || [],
              enrolledTeams || []
            )}
          </Text>
        )}
      </Box>
      <Box padding={'3rem'}>
        <Tabs>
          <TabList>
            <Tab>
              Single (
              {enrolledPlayers
                ? enrolledPlayers.length +
                  (enrolledPlayers.length === 1 ? ' player' : ' players')
                : `0 players`}
              )
            </Tab>
            <Tab>
              Double (
              {enrolledTeams
                ? enrolledTeams.length +
                  (enrolledTeams.length === 1 ? ' team' : ' teams')
                : '0 teams'}
              )
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box>
                <EnrolTournamentPlayers
                  players={enrolledPlayers!}
                  onEnrolNewPlayer={handleEnrolNewPlayer}
                  isEnrolling={loading}
                  availablePlayers={availablePlayers || []}
                  onEnrolPlayer={handleEnrolPlayer}
                ></EnrolTournamentPlayers>
              </Box>
            </TabPanel>
            <TabPanel>
              <EnrolTournamentTeams
                availablePlayers={availableTeamPlayers || []}
                teams={enrolledTeams || []}
                onEnrolTeam={handleEnrolTeam}
                isSubmitting={loading}
                onCreateNewPlayer={handleCreateNewPlayer}
              ></EnrolTournamentTeams>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
