import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/fp/map";

import Option from "./option.connect";

const Base = styled.div``;

class WorkspaceSelector extends React.PureComponent {
  render() {
    const { workspaceIds } = this.props;

    return (
      <Base>
        Workspace:
        <select>
          {map(workspaceId => (
            <Option key={workspaceId} workspaceId={workspaceId} />
          ))(workspaceIds)}
        </select>
      </Base>
    );
  }
}

WorkspaceSelector.propTypes = {
  workspaceIds: PropTypes.array
};

WorkspaceSelector.defaultProps = {
  workspaceIds: []
};

export default WorkspaceSelector;
