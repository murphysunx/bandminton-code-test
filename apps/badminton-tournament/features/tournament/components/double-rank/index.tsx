import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RankedTeam } from '@libs/player';

interface DoubleRankProps {
  rankedTeams: RankedTeam[];
}

export default function DoubleRank({ rankedTeams }: DoubleRankProps) {
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
              Double Ranks
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th border={'1px solid lightgray'}>Rank</Th>
            <Th border={'1px solid lightgray'}>Team</Th>
            <Th border={'1px solid lightgray'}>wins</Th>
            <Th border={'1px solid lightgray'}>points</Th>
          </Tr>
          {rankedTeams.map((rank, idx) => {
            return (
              <Tr key={`match-row-${idx}`}>
                <Td border={'1px solid lightgray'}>{idx + 1}</Td>
                <Td border={'1px solid lightgray'}>
                  {rank.team.player1.name + ' & ' + rank.team.player2.name}
                </Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {rank.wins}
                </Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {rank.points}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
