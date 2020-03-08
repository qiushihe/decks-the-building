import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ActionsHeader from "/src/component/actions-header";

import {
  StackIcon,
  RenameIcon,
  CreateIcon,
  DeleteIcon,
  AddCardsIcon,
  CombineCardsIcon
} from "/src/component/icon";

const Base = styled(ActionsHeader)`
  margin: 6px 0 2px 6px;
`;

const StyledStackIcon = styled(StackIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

class StackHeader extends React.PureComponent {
  render() {
    const {
      className,
      stackLabel,
      stackCardsCount,
      addCardsToStack,
      combineDuplicateCards,
      renameStack,
      createStack,
      removeStack
    } = this.props;

    return (
      <Base
        className={className}
        icon={StyledStackIcon}
        label={
          stackCardsCount > 0
            ? `${stackLabel} (${stackCardsCount})`
            : stackLabel
        }
        actions={[
          { title: "Edit", icon: RenameIcon, action: renameStack },
          {
            title: "+Cards",
            icon: AddCardsIcon,
            action: addCardsToStack
          },
          {
            title: "Merge",
            icon: CombineCardsIcon,
            action: combineDuplicateCards
          },
          { title: "Del", icon: DeleteIcon, action: removeStack },
          { title: "New", icon: CreateIcon, action: createStack }
        ]}
      />
    );
  }
}

StackHeader.propTypes = {
  className: PropTypes.string,
  stackLabel: PropTypes.string,
  stackCardsCount: PropTypes.number,
  addCardsToStack: PropTypes.func,
  combineDuplicateCards: PropTypes.func,
  renameStack: PropTypes.func,
  createStack: PropTypes.func,
  removeStack: PropTypes.func
};

StackHeader.defaultProps = {
  className: "",
  stackLabel: "",
  stackCardsCount: 0,
  addCardsToStack: () => {},
  combineDuplicateCards: () => {},
  renameStack: () => {},
  createStack: () => {},
  removeStack: () => {}
};

export default StackHeader;
