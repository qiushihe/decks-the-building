import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import { RenameIcon, DeleteIcon, CreateIcon } from "/src/component/icon";

const IconStyle = css`
  margin: 2px;
  cursor: pointer;
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }
`;

const makeLaneActionIcon = IconComponent => styled(IconComponent).attrs({
  size: 20
})`
  ${IconStyle}
`;

const RenameLane = makeLaneActionIcon(RenameIcon);
const DeleteLane = makeLaneActionIcon(DeleteIcon);
const CreateLane = makeLaneActionIcon(CreateIcon);

class LaneActions extends React.PureComponent {
  render() {
    const { className, renameLane, createLane, removeLane } = this.props;
    return (
      <div className={className}>
        <Tooltip title="Rename Lane">
          <IconButton size="small" onClick={renameLane}>
            <RenameLane />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Lane">
          <IconButton size="small" onClick={removeLane}>
            <DeleteLane />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create Lane">
          <IconButton size="small" onClick={createLane}>
            <CreateLane />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

LaneActions.propTypes = {
  className: PropTypes.string,
  renameLane: PropTypes.func,
  createLane: PropTypes.func,
  removeLane: PropTypes.func
};

LaneActions.defaultProps = {
  className: "",
  renameLane: () => {},
  createLane: () => {},
  removeLane: () => {}
};

export default LaneActions;
