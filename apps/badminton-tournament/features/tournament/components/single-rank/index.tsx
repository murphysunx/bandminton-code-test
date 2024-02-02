import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RankedPlayer } from '@libs/player';

interface SingleRankProps {
  rankedPlayers: RankedPlayer[];
}

export default function SingleRank({ rankedPlayers }: SingleRankProps) {
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
              Single Ranks
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th border={'1px solid lightgray'}>Rank</Th>
            <Th border={'1px solid lightgray'}>Player</Th>
            <Th border={'1px solid lightgray'}>wins</Th>
            <Th border={'1px solid lightgray'}>points</Th>
          </Tr>
          {rankedPlayers.map((rank, idx) => {
            return (
              <Tr key={`match-row-${idx}`}>
                <Td border={'1px solid lightgray'}>{idx + 1}</Td>
                <Td border={'1px solid lightgray'}>{rank.player.name}</Td>
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
