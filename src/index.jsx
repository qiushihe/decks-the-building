import React from "react";
import ReactDOM from "react-dom";
import flowRight from "lodash/fp/flowRight";

import NormalizedStyleProvider from "/src/provider/normalized-style.provider";
import MaterialUiProvider from "/src/provider/material-ui.provider";
import BelerenFontProvider from "/src/provider/beleren-font-provider";
import ReduxStoreProvider from "/src/provider/redux-store.provider";
import ModalProvider from "/src/provider/modal.provider";
import createStore from "/src/store/create";
import { withContainer } from "/src/util/render.util";

import Application from "./component/application";

const store = createStore({});

const withProviders = flowRight([
  withContainer(NormalizedStyleProvider),
  withContainer(MaterialUiProvider),
  withContainer(BelerenFontProvider),
  withContainer(ReduxStoreProvider, { store }),
  withContainer(ModalProvider)
]);

class AppRoot extends React.PureComponent {
  render() {
    return React.Children.toArray([withProviders(<Application />)]);
  }
}

ReactDOM.render(<AppRoot />, document.getElementById("root"));
