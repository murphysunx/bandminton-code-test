import { Box, Button, ButtonGroup, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface PlayerFormProps {
  onAddPlayer: (name: string) => void;
  onCancel: () => void;
}

export default function PlayerForm({ onAddPlayer, onCancel }: PlayerFormProps) {
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setName(e.target.value);
    }
  };

  const handleSave = () => {
    onAddPlayer(name);
    setName('');
  };

  return (
    <Box>
      <Input
        size={'md'}
        placeholder="player name"
        onChange={handleNameChange}
        value={name}
      />

      <ButtonGroup mt={'1rem'} variant="outline" spacing="6">
        <Button
          colorScheme="blue"
          size="md"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </Box>
  );
}
