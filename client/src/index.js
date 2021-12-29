import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
// Provider keep track of that store --> Global state that allows us to access that store from anywhere inside of the app
// We can access that state anywhere, not restrick by children or parent components
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
