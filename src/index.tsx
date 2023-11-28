import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import styled, {createGlobalStyle}  from "styled-components";
import {Provider} from "react-redux";
import {store} from "./core/redux/store";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const Global = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir;
}
`
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Global/>
              <App/>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
);
