import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TournamentDoubleRound } from '@libs/round';

interface DoubleRoundProps {
  round: TournamentDoubleRound;
}

export default function DoubleRound({ round }: DoubleRoundProps) {
  const { index, matches } = round;

  return (
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
              Double Round {index}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th border={'1px solid lightgray'}>Match</Th>
            <Th border={'1px solid lightgray'}>Team 1</Th>
            <Th border={'1px solid lightgray'}>Team 2</Th>
            <Th border={'1px solid lightgray'} colSpan={2}>
              Score
            </Th>
          </Tr>
          {matches.map((match, idx) => {
            return (
              <Tr key={`match-row-${idx}`}>
                <Td border={'1px solid lightgray'}>{idx + 1}</Td>
                <Td border={'1px solid lightgray'}>
                  {match.team1.player1.name + ' & ' + match.team1.player2.name}
                </Td>
                <Td border={'1px solid lightgray'}>
                  {match.team2.player1.name + ' & ' + match.team2.player2.name}
                </Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {match.team1Score ?? '-'}
                </Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {match.team2Score ?? '-'}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
