'use client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { IDoubleMatch, ISingleMatch } from '@libs/match';
import { useEffect, useState } from 'react';
import SelectDoubleMatch from '../../../../../features/match/components/select-double-match';
import SelectSingleMatch from '../../../../../features/match/components/select-single-match';
import UpdateDoubleMatch from '../../../../../features/match/components/update-double-match';
import UpdateSingleMatch from '../../../../../features/match/components/update-single-match';
import DoubleRound from '../../../../../features/round/components/double-round';
import SingleRound from '../../../../../features/round/components/single-round';
import DoubleRank from '../../../../../features/tournament/components/double-rank';
import SingleRank from '../../../../../features/tournament/components/single-rank';
import { useGetLatestRounds } from '../../../../../features/tournament/core/hooks/get-latest-rounds';
import { useGetTournament } from '../../../../../features/tournament/core/hooks/get-tournament';
import { ENDPOINT } from './../../../../../core';
import { TournamentDoubleRound, TournamentSingleRound } from '@libs/round';

export default function TournamentLatestRounds({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;

  const { fetchTournament, tournament } = useGetTournament(id);

  const { getLatestRounds } = useGetLatestRounds(id);

  const [isLoading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const [singleRound, setSingleRound] = useState<TournamentSingleRound>();
  const [doubleRound, setDoubleRound] = useState<TournamentDoubleRound>();

  const [selectedSingleMatch, setSelectedSingleMatch] =
    useState<ISingleMatch>();
  const [selectedDoubleMatch, setSelectedDoubleMatch] =
    useState<IDoubleMatch>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(void 0);
      try {
        const rounds = await getLatestRounds();
        console.log('rounds', rounds);

        if (rounds?.singleRound?.matches?.length) {
          setSelectedSingleMatch(rounds.singleRound.matches[0]);
          setSingleRound(rounds.singleRound);
        }
        if (rounds?.doubleRound?.matches?.length) {
          setSelectedDoubleMatch(rounds.doubleRound.matches[0]);
          setDoubleRound(rounds.doubleRound);
        }
        await fetchTournament();
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchTournament, getLatestRounds, id]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading latest rounds: {error}</Box>;
  }

  let singleRoundContent;
  let doubleRoundContent;

  let roundContent;

  const handleSelectSingleMatch = async (match: ISingleMatch) => {
    setSelectedSingleMatch(match);
  };

  const handleUpdateSingleMatch = async (score1: number, score2: number) => {
    if (singleRound && selectedSingleMatch) {
      setLoading(true);
      // update match
      try {
        const response = await fetch(
          `${ENDPOINT}/tournaments/${id}/rounds/${singleRound.id}/matches/${selectedSingleMatch.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score1, score2 }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to update match');
        }
        await response.json();
        const rounds = await getLatestRounds();
        if (rounds) {
          setSingleRound(rounds.singleRound);
          setSelectedSingleMatch(rounds.singleRound?.matches[0]);
          setDoubleRound(rounds.doubleRound);
          setSelectedDoubleMatch(rounds.doubleRound?.matches[0]);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSelectDoubleMatch = async (match: IDoubleMatch) => {
    setSelectedDoubleMatch(match);
  };

  const handleUpdateDoubleMatch = async (score1: number, score2: number) => {
    if (doubleRound && selectedDoubleMatch) {
      setLoading(true);
      // update match
      try {
        const response = await fetch(
          `${ENDPOINT}/tournaments/${id}/rounds/${doubleRound.id}/matches/${selectedDoubleMatch.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score1, score2 }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to update match');
        }
        await response.json();
        await getLatestRounds();
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNextSingleRound = async () => {
    if (singleRound) {
      try {
        const response = await fetch(
          `${ENDPOINT}/tournaments/${id}/rounds/${singleRound.id}/next`
        );
        if (!response.ok) {
          throw new Error('Failed to end round');
        }
        const round = await response.json();
        setSingleRound(round);
        setSelectedSingleMatch(round?.matches[0]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (singleRound) {
    singleRoundContent = (
      <Flex
        padding={'2rem'}
        columnGap={'5rem'}
        border={'2px solid'}
        borderRadius={'2rem'}
      >
        <Box minW={'30%'}>
          <SingleRank rankedPlayers={singleRound.rank} />
        </Box>
        <Flex flexGrow={1} columnGap={'5rem'}>
          <SingleRound round={singleRound} />
          {singleRound.matches.filter((match) => match.state === 'PRISTINE')
            .length > 0 && (
            <Box>
              <SelectSingleMatch
                selectedMatch={selectedSingleMatch}
                matches={singleRound.matches.filter(
                  (match) => match.state === 'PRISTINE'
                )}
                onSelectMatch={handleSelectSingleMatch}
              />
              {selectedSingleMatch && (
                <Box mt={'2rem'}>
                  <UpdateSingleMatch
                    match={selectedSingleMatch}
                    onUpdateMatch={handleUpdateSingleMatch}
                  />
                </Box>
              )}
            </Box>
          )}
          {singleRound.matches.filter((match) => match.state === 'PRISTINE')
            .length === 0 && (
            <Button
              colorScheme="purple"
              onClick={() => {
                handleNextSingleRound();
              }}
            >
              End this round
            </Button>
          )}
        </Flex>
      </Flex>
    );
  }

  if (doubleRound) {
    doubleRoundContent = (
      <Box>
        <Flex
          padding={'2rem'}
          columnGap={'5rem'}
          border={'2px solid'}
          borderRadius={'2rem'}
        >
          <Box minW={'30%'}>
            <DoubleRank rankedTeams={doubleRound.rank} />
          </Box>
          <Flex flexGrow={1} columnGap={'5rem'}>
            <DoubleRound round={doubleRound} />
            <Box>
              <SelectDoubleMatch
                selectedMatch={selectedDoubleMatch}
                matches={doubleRound.matches.filter(
                  (match) => match.state === 'PRISTINE'
                )}
                onSelectMatch={handleSelectDoubleMatch}
              />
              {selectedDoubleMatch && (
                <Box mt={'2rem'}>
                  <UpdateDoubleMatch
                    match={selectedDoubleMatch}
                    onUpdateMatch={handleUpdateDoubleMatch}
                  />
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  }

  if (singleRound && doubleRound) {
    roundContent = (
      <Tabs>
        <TabList>
          <Tab>Single Round {singleRound.index}</Tab>
          <Tab>Double Round {doubleRound.index}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{singleRoundContent}</TabPanel>
          <TabPanel>{doubleRoundContent}</TabPanel>
        </TabPanels>
      </Tabs>
    );
  } else {
    roundContent = (
      <>
        {singleRoundContent} {doubleRoundContent}
      </>
    );
  }
  return (
    <Box padding={'5rem'}>
      {tournament && <Heading mb={'2rem'}>{tournament.name} - latest</Heading>}
      {roundContent}
    </Box>
  );
}
