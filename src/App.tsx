/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { ThemeProvider, createTheme, Paper } from '@material-ui/core';

import AlgorithmVisualizer from './AlgorithmVisualizer';

const theme = createTheme({
  palette: { type: "dark" }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Paper css={css`
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 0 !important;
      `}>
        <div css={css`
          width: 600px;
          max-width: 100vw;
        `}>
          <AlgorithmVisualizer />
        </div>
      </Paper>
    </ThemeProvider>
  );
}