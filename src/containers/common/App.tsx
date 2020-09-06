import React, { FC, useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import makeTheme from "utils/makeTheme";
import { ThemeProvider } from "styled-components";
import Tree from "./Tree";

const App: FC = () => {
  const theme = useMemo(() => makeTheme(), []);
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Tree />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
