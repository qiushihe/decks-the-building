import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/fp/map";

import Select from "@material-ui/core/Select";

import Option from "./option.connect";

const Base = styled.div``;

const StyledSelect = styled(Select)`
  width: 250px;
`;

class WorkspaceSelector extends React.PureComponent {
  render() {
    const { workspaceIds, workspaceId, activate } = this.props;

    return (
      <Base>
        <StyledSelect
          native
          variant="outlined"
          margin="dense"
          value={workspaceId || ""}
          onChange={evt => activate({ id: evt.target.value })}
        >
          {map(id => <Option key={id} workspaceId={id} />)(workspaceIds)}
        </StyledSelect>
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
