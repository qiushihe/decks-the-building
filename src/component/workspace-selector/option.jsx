import React from "react";
import PropTypes from "prop-types";

class Option extends React.PureComponent {
  render() {
    const { workspaceId, label } = this.props;
    return <option value={workspaceId}>{label}</option>;
  }
}

Option.propTypes = {
  workspaceId: PropTypes.string,
  label: PropTypes.string
};

Option.defaultProps = {
  workspaceId: "",
  label: ""
};

export default Option;
