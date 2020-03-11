import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ActionsHeader from "/src/component/actions-header";
import { STACK_MENU } from "/src/enum/tooltip.enum";
import { StackIcon } from "/src/component/icon";

const Base = styled(ActionsHeader)`
  margin: 6px 0 12px 6px;
`;

const StyledStackIcon = styled(StackIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

class StackHeader extends React.PureComponent {
  render() {
    const {
      className,
      laneId,
      stackIndex,
      stackId,
      stackLabel,
      stackCardsCount
    } = this.props;

    return (
      <Base
        className={className}
        icon={StyledStackIcon}
        label={stackLabel}
        labelSuffix={() =>
          stackCardsCount > 0 ? (
            <React.Fragment>&nbsp;({stackCardsCount})</React.Fragment>
          ) : null
        }
        menuName={STACK_MENU}
        menuProps={{ laneId, stackIndex, stackId }}
      />
    );
  }
}

StackHeader.propTypes = {
  className: PropTypes.string,
  laneId: PropTypes.string,
  stackIndex: PropTypes.number,
  stackId: PropTypes.string,
  stackLabel: PropTypes.string,
  stackCardsCount: PropTypes.number
};

StackHeader.defaultProps = {
  className: "",
  laneId: "",
  stackIndex: 0,
  stackId: "",
  stackLabel: "",
  stackCardsCount: 0
};

export default StackHeader;
