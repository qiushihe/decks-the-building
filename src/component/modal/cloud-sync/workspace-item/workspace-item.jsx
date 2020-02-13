import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Base = styled.div``;

export class WorkspaceItem extends React.PureComponent {
  render() {
    const { label, isSelected, selectWorkspace } = this.props;

    return (
      <Base>
        <input type="radio" checked={isSelected} onChange={selectWorkspace} />
        {label}
      </Base>
    );
  }
}

WorkspaceItem.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  selectWorkspace: PropTypes.func
};

WorkspaceItem.defaultProps = {
  label: "",
  isSelected: false,
  selectWorkspace: () => {}
};

export default WorkspaceItem;
