import { extendTheme } from '@chakra-ui/react';

import grape from './themes/grape';
import { modalTheme } from './themes/modal';

const theme = {
  config: {
    initialColorMode: 'system', // see https://chakra-ui.com/docs/styled-system/color-mode
    useSystemColorMode: true,
  },
  colors: grape.colors,
};

export default extendTheme({
  ...theme,
  compnents: {
    Modal: modalTheme,
  },
});
