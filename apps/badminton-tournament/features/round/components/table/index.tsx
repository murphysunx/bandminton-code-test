import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { IMatchResult } from '../../interfaces';

interface RoundTableProps {
  name: string;
  results: IMatchResult[];
}

export default function RoundTable({ name, results }: RoundTableProps) {
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
            <Th colSpan={5} border={'1px solid lightgray'}>
              {name}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th border={'1px solid lightgray'}>Match</Th>
            <Th border={'1px solid lightgray'}>Player(s) 1</Th>
            <Th border={'1px solid lightgray'}>Player(s) 2</Th>
            <Th border={'1px solid lightgray'} colSpan={2}>
              Score
            </Th>
          </Tr>
          {results.map((result, idx) => {
            return (
              <Tr key={`match-row-${idx}`}>
                <Td border={'1px solid lightgray'}>{idx + 1}</Td>
                <Td border={'1px solid lightgray'}>{result.player1.name}</Td>
                <Td border={'1px solid lightgray'}>{result.player2.name}</Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {result.player1.score}
                </Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {result.player2.score}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
