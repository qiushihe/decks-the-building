import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ActionsHeader from "/src/component/actions-header";
import { LANE_MENU } from "/src/enum/tooltip.enum";
import { LaneIcon } from "/src/component/icon";

const Base = styled(ActionsHeader)`
  margin: 12px 0 12px 16px;
`;

const StyledLaneIcon = styled(LaneIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

class LaneHeader extends React.PureComponent {
  render() {
    const {
      className,
      workspaceId,
      laneIndex,
      laneId,
      laneLabel,
      laneCardsCount
    } = this.props;

    return (
      <Base
        className={className}
        icon={StyledLaneIcon}
        label={laneLabel}
        labelSuffix={() =>
          laneCardsCount > 0 ? (
            <React.Fragment>&nbsp;({laneCardsCount})</React.Fragment>
          ) : null
        }
        menuName={LANE_MENU}
        menuProps={{ workspaceId, laneIndex, laneId }}
      />
    );
  }
}

LaneHeader.propTypes = {
  className: PropTypes.string,
  workspaceId: PropTypes.string,
  laneIndex: PropTypes.number,
  laneId: PropTypes.string,
  laneLabel: PropTypes.string,
  laneCardsCount: PropTypes.number
};

LaneHeader.defaultProps = {
  className: "",
  workspaceId: "",
  laneIndex: 0,
  laneId: "",
  laneLabel: "",
  laneCardsCount: 0
};

export default LaneHeader;
