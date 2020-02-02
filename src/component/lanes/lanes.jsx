import React from "react";
import PropTypes from "prop-types";
import map from "lodash/fp/map";

import Lane from "/src/component/lane";

class Lanes extends React.PureComponent {
  render() {
    const { laneIds } = this.props;

    return (
      <div>{map(laneId => <Lane key={laneId} laneId={laneId} />)(laneIds)}</div>
    );
  }
}

Lanes.propTypes = {
  laneIds: PropTypes.array
};

Lanes.defaultProps = {
  laneIds: []
};

export default Lanes;
