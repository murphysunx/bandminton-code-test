import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TournamentSingleRound } from '@libs/round';

interface SingleRoundProps {
  round: TournamentSingleRound;
}

export default function SingleRound({ round }: SingleRoundProps) {
  const { index, matches } = round;

  return (
    <Box>
      <TableContainer>
        <Table
          variant="simple"
          size="lg"
          minWidth={'500px'}
          style={{ borderCollapse: 'collapse' }}
          textAlign={'center'}
          border={'1px solid lightgray'}
        >
          <Thead bgColor={'darkgray'}>
            <Tr>
              <Th colSpan={6} border={'1px solid lightgray'}>
                Single Round {index}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th border={'1px solid lightgray'}>Match</Th>
              <Th border={'1px solid lightgray'}>Player 1</Th>
              <Th border={'1px solid lightgray'}>Player 2</Th>
              <Th border={'1px solid lightgray'} colSpan={2}>
                Score
              </Th>
            </Tr>
            {matches.map((match, idx) => {
              return (
                <Tr key={`match-row-${idx}`}>
                  <Td border={'1px solid lightgray'}>{idx + 1}</Td>
                  <Td border={'1px solid lightgray'}>{match.player1.name}</Td>
                  <Td border={'1px solid lightgray'}>{match.player2.name}</Td>
                  <Td border={'1px solid lightgray'} isNumeric>
                    {match.player1Score ?? '-'}
                  </Td>
                  <Td border={'1px solid lightgray'} isNumeric>
                    {match.player2Score ?? '-'}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
