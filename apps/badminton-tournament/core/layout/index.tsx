import { Box, Flex } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction={'column'}>
      {/* heaer */}
      <Box height="100px">Header</Box>
      {/* body */}
      <Box flexGrow={'1'} bg="gray.100" minHeight={'calc(100vh - 100px)'}>
        {children}
      </Box>
    </Flex>
  );
}
