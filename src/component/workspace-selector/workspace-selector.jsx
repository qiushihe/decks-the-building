import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/fp/map";

import Option from "./option.connect";

const Base = styled.div``;

class WorkspaceSelector extends React.PureComponent {
  render() {
    const { workspaceIds, workspaceId, activate } = this.props;

    return (
      <Base>
        Workspace: &nbsp;
        <select
          value={workspaceId || ""}
          onChange={evt => activate({ id: evt.target.value })}
        >
          {map(id => <Option key={id} workspaceId={id} />)(workspaceIds)}
        </select>
      </Base>
    );
  }
}

WorkspaceSelector.propTypes = {
  workspaceIds: PropTypes.array,
  workspaceId: PropTypes.string,
  activate: PropTypes.func
};

WorkspaceSelector.defaultProps = {
  workspaceIds: [],
  workspaceId: "",
  activate: () => {}
};

export default WorkspaceSelector;
