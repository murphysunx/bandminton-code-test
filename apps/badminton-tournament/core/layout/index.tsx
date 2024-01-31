import { Box } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box height="100vh">
      {/* heaer */}
      <Box height="100px">Header</Box>
      {/* body */}
      <Box height={'calc(100vh - 100px)'} bg="gray.100">
        {children}
      </Box>
    </Box>
  );
}
