import React from "react";
import ReactDOM from "react-dom";
import flowRight from "lodash/fp/flowRight";

import NormalizedStyleProvider from "/src/provider/normalized-style.provider";
import MaterialUiProvider from "/src/provider/material-ui.provider";
import ReduxStoreProvider from "/src/provider/redux-store.provider";
import ModalProvider from "/src/provider/modal.provider";
import createStore from "/src/store/create";
import Application from "./component/application";

const store = createStore({});

const withProvider = (Provider, props = {}) => children => (
  <Provider {...props}>{children}</Provider>
);

const withProviders = flowRight([
  withProvider(NormalizedStyleProvider),
  withProvider(MaterialUiProvider),
  withProvider(ReduxStoreProvider, { store }),
  withProvider(ModalProvider)
]);

class AppRoot extends React.PureComponent {
  render() {
    return React.Children.toArray([withProviders(<Application />)]);
  }
}

ReactDOM.render(<AppRoot />, document.getElementById("root"));
