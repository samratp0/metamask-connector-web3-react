import { createGlobalStyle } from 'styled-components';
import { ThemeProps } from '@/utils/types/theme.types';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px;
    font-family: 'Kanit', sans-serif;;
  }
  
  body {
    background: ${(props: ThemeProps) => props.theme.background};
    color: ${(props: ThemeProps) => props.theme.text};
  }

  a{
    color: ${(props: ThemeProps) => props.theme.secondary};
    text-decoration: none;
  }
`;

export default GlobalStyles;
