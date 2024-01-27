import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { IMatchPlayer, IMatch } from '../../interfaces';
import RoundTable from '../table';
import MatchResultForm from '../match-result-form';

interface RoundOverviewProps {
  name: string;
  results: IMatch[];
  onAddMatchResult: (result1: IMatchPlayer, result2: IMatchPlayer) => void;
}

export default function RoundOverview({
  name,
  results,
  onAddMatchResult: addMatchResult,
}: RoundOverviewProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const existingPlayers = results
    .map((match) => [match.player1.name, match.player2.name])
    .flat();

  const handleSave = (result1: IMatchPlayer, result2: IMatchPlayer) => {
    addMatchResult(result1, result2);
    onClose();
  };
  return (
    <Box padding={'1rem'} border={'1px'} borderColor={'darkgray'}>
      <RoundTable name={name} results={results}></RoundTable>
      <Button mt={'1rem'} size={'md'} onClick={onOpen}>
        Add match
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h2" size="xl">
              Add a match result
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MatchResultForm
              onSave={handleSave}
              onCancel={onClose}
              roundPlayers={existingPlayers}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
