import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ActionsHeader from "/src/component/actions-header";
import { LANE_MENU } from "/src/enum/tooltip.enum";

import {
  RenameIcon,
  DeleteIcon,
  CreateIcon,
  LaneIcon
} from "/src/component/icon";

const Base = styled(ActionsHeader)`
  margin: 16px 0 4px 16px;
`;

const StyledLaneIcon = styled(LaneIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

class LaneHeader extends React.PureComponent {
  render() {
    const {
      className,
      laneId,
      laneLabel,
      laneCardsCount,
      renameLane,
      createLane,
      removeLane
    } = this.props;

    return (
      <Base
        className={className}
        icon={StyledLaneIcon}
        label={
          laneCardsCount > 0 ? `${laneLabel} (${laneCardsCount})` : laneLabel
        }
        actions={[
          { title: "Rename Lane", icon: RenameIcon, action: renameLane },
          { title: "Delete Lane", icon: DeleteIcon, action: removeLane },
          { title: "Create Lane", icon: CreateIcon, action: createLane }
        ]}
        menuName={LANE_MENU}
        menuProps={{ laneId }}
      />
    );
  }
}

LaneHeader.propTypes = {
  className: PropTypes.string,
  laneId: PropTypes.string,
  laneLabel: PropTypes.string,
  laneCardsCount: PropTypes.number,
  renameLane: PropTypes.func,
  createLane: PropTypes.func,
  removeLane: PropTypes.func
};

LaneHeader.defaultProps = {
  className: "",
  laneId: "",
  laneLabel: "",
  laneCardsCount: 0,
  renameLane: () => {},
  createLane: () => {},
  removeLane: () => {}
};

export default LaneHeader;
