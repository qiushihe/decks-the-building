import React from "react";
import PropTypes from "prop-types";

import Lanes from "/src/component/lanes";

class Application extends React.PureComponent {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    return (
      <div>
        <Lanes />
      </div>
    );
  }
}

Application.propTypes = {
  onMount: PropTypes.func
};

Application.defaultProps = {
  onMount: () => {}
};

export default Application;
