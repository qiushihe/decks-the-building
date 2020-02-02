import React from "react";
import ReactDOM from "react-dom";
import flowRight from "lodash/fp/flowRight";

import ReduxStoreProvider from "/src/provider/redux-store.provider";
import createStore from "/src/store/create";
import Application from "./component/application";

const store = createStore({}, { history });

const withProvider = (Provider, props = {}) => children => (
  <Provider {...props}>{children}</Provider>
);

const withProviders = flowRight([withProvider(ReduxStoreProvider, { store })]);

class AppRoot extends React.PureComponent {
  render() {
    return React.Children.toArray([withProviders(<Application />)]);
  }
}

ReactDOM.render(<AppRoot />, document.getElementById("root"));
