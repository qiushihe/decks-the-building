import React from "react";
import ReactDOM from "react-dom";
import flowRight from "lodash/fp/flowRight";

import ReduxStoreProvider from "/src/provider/redux-store.provider";
import createStore from "/src/store/create";

const store = createStore({}, { history });

const withProvider = (Provider, props = {}) => children => (
  <Provider {...props}>{children}</Provider>
);

const withProviders = flowRight([withProvider(ReduxStoreProvider, { store })]);

class AppRoot extends React.PureComponent {
  render() {
    return React.Children.toArray([withProviders(<h1>It Worked!</h1>)]);
  }
}

ReactDOM.render(<AppRoot />, document.getElementById("root"));
