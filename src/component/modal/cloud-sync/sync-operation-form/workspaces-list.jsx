import React from "react";
import PropTypes from "prop-types";
import map from "lodash/fp/map";
import isEmpty from "lodash/fp/isEmpty";

import Select from "@material-ui/core/Select";

import Option from "./option.connect";

export class WorkspacesList extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const { selectWorkspace } = this.props;

    selectWorkspace({ id: evt.target.value });
  }

  render() {
    const { workspaceIds, selectedWorkspaceId } = this.props;

    return (
      <Select
        native
        variant="outlined"
        value={selectedWorkspaceId || ""}
        onChange={this.handleChange}
        fullWidth={true}
      >
        {isEmpty(selectedWorkspaceId) && (
          <option value="">-- No Workspace Selected --</option>
        )}
        {map(workspaceId => (
          <Option key={workspaceId} workspaceId={workspaceId} />
        ))(workspaceIds)}
      </Select>
    );
  }
}

WorkspacesList.propTypes = {
  workspaceIds: PropTypes.array,
  selectedWorkspaceId: PropTypes.string,
  selectWorkspace: PropTypes.func
};

WorkspacesList.defaultProps = {
  workspaceIds: [],
  selectedWorkspaceId: "",
  selectWorkspace: () => {}
};

export default WorkspacesList;
