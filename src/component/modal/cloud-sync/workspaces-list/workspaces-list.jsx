import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/fp/map";

import WorkspaceItem from "../workspace-item";

const Base = styled.div``;

export class WorkspacesList extends React.PureComponent {
  render() {
    const { workspaceIds } = this.props;

    return (
      <Base>
        {map(workspaceId => (
          <WorkspaceItem key={workspaceId} workspaceId={workspaceId} />
        ))(workspaceIds)}
      </Base>
    );
  }
}

WorkspacesList.propTypes = {
  workspaceIds: PropTypes.array
};

WorkspacesList.defaultProps = {
  workspaceIds: []
};

export default WorkspacesList;
