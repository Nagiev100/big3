import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "./core/redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const theme = {
  mobile: "(max-width:480px)",
  tablet: "(min-width:481px) and (max-width:1024px)",
  laptop: `(min-width:1025px) and (max-width:1200px)`,
};
const Global = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir;
}
`;
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Global />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
