import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import EditMatchResult from '../../../../features/match/components/edit-result';
import { IMatch } from '../../../match/interfaces';

interface RoundTableProps {
  name: string;
  matches: IMatch[];
}

export default function RoundTable({ name, matches }: RoundTableProps) {
  const {
    isOpen: isEditResultModalOpen,
    onOpen: onOpenEditResultModal,
    onClose: onCloseEditResultModal,
  } = useDisclosure();

  const handleSaveEditResult = (
    match: IMatch,
    player1Score: number,
    player2Score: number
  ) => {
    throw new Error('Not implemented');
  };

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
            <Th border={'1px solid lightgray'}>Action</Th>
          </Tr>
          {matches.map((match, idx) => {
            return (
              <Tr key={`match-row-${idx}`}>
                <Td border={'1px solid lightgray'}>{idx + 1}</Td>
                <Td border={'1px solid lightgray'}>{match.player1.name}</Td>
                <Td border={'1px solid lightgray'}>{match.player2.name}</Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {match.player1.score}
                </Td>
                <Td border={'1px solid lightgray'} isNumeric>
                  {match.player2.score}
                </Td>
                <Td border={'1px solid lightgray'}>
                  <Button onClick={onOpenEditResultModal}>Edit result</Button>
                  <Modal
                    isOpen={isEditResultModalOpen}
                    onClose={onCloseEditResultModal}
                    isCentered
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>
                        <Heading as="h2" size="xl">
                          Add a player
                        </Heading>
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <EditMatchResult
                          match={match}
                          onSave={(player1Score, player2Score) => {
                            handleSaveEditResult(
                              match,
                              player1Score,
                              player2Score
                            );
                          }}
                          onCancel={onCloseEditResultModal}
                        />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
