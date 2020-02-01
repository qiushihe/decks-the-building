import React from "react";
import ReactDOM from "react-dom";

class RootComponent extends React.PureComponent {
  render() {
    return <h1>It Worked!</h1>;
  }
}

ReactDOM.render(<RootComponent />, document.getElementById("root"));
