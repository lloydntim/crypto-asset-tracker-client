import {createGlobalStyle} from 'styled-components';
import {GRAPE_DARK, WHITE} from './constants/colors';

export default createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${GRAPE_DARK};
    color: ${WHITE};

    font-family: Arial, Helvetica, sans-serif;

    * {
      box-sizing: border-box;

      &:after,
      &:before {
        box-sizing: border-box;
      }
    }
  }
`;
