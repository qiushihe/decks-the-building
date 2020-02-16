import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import ActionsHeader, {
  ActionsHeaderLabel
} from "/src/component/actions-header";

import {
  RenameIcon,
  DeleteIcon,
  CreateIcon,
  LaneIcon
} from "/src/component/icon";

const Base = styled(ActionsHeader)`
  padding-left: 16px;
`;

const StyledLaneIcon = styled(LaneIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

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

class LaneHeader extends React.PureComponent {
  render() {
    const {
      className,
      laneLabel,
      laneCardsCount,
      renameLane,
      createLane,
      removeLane
    } = this.props;

    return (
      <Base
        className={className}
        renderLabel={() => (
          <ActionsHeaderLabel
            icon={StyledLaneIcon}
            label={
              laneCardsCount > 0
                ? `${laneLabel} (${laneCardsCount})`
                : laneLabel
            }
          />
        )}
        actions={[
          { title: "Rename Lane", icon: RenameLane, action: renameLane },
          { title: "Delete Lane", icon: DeleteLane, action: removeLane },
          { title: "Create Lane", icon: CreateLane, action: createLane }
        ]}
        disableLabelAutoHide={true}
      />
    );
  }
}

LaneHeader.propTypes = {
  className: PropTypes.string,
  laneLabel: PropTypes.string,
  laneCardsCount: PropTypes.number,
  renameLane: PropTypes.func,
  createLane: PropTypes.func,
  removeLane: PropTypes.func
};

LaneHeader.defaultProps = {
  className: "",
  laneLabel: "",
  laneCardsCount: 0,
  renameLane: () => {},
  createLane: () => {},
  removeLane: () => {}
};

export default LaneHeader;
