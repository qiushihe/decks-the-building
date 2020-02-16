import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import ActionsHeader, {
  ActionsHeaderLabel
} from "/src/component/actions-header";

import {
  StackIcon,
  RenameIcon,
  CreateIcon,
  DeleteIcon,
  AddCardsIcon,
  CombineCardsIcon
} from "/src/component/icon";

const Base = styled(ActionsHeader)`
  padding-left: 6px;
`;

const StyledStackIcon = styled(StackIcon)`
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

const makeStackActionIcon = IconComponent => styled(IconComponent).attrs({
  size: 20
})`
  ${IconStyle}
`;

const RenameStack = makeStackActionIcon(RenameIcon);
const AddCardsToStack = makeStackActionIcon(AddCardsIcon);
const DeleteStack = makeStackActionIcon(DeleteIcon);
const CombineCardsInStack = makeStackActionIcon(CombineCardsIcon);
const CreateStack = makeStackActionIcon(CreateIcon);

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
        renderLabel={() => (
          <ActionsHeaderLabel
            icon={StyledStackIcon}
            label={
              stackCardsCount > 0
                ? `${stackLabel} (${stackCardsCount})`
                : stackLabel
            }
          />
        )}
        actions={[
          { title: "Rename Stack", icon: RenameStack, action: renameStack },
          {
            title: "Add Cards to Stack",
            icon: AddCardsToStack,
            action: addCardsToStack
          },
          {
            title: "Combine Cards in Stack",
            icon: CombineCardsInStack,
            action: combineDuplicateCards
          },
          { title: "Delete Stack", icon: DeleteStack, action: removeStack },
          { title: "Create Stack", icon: CreateStack, action: createStack }
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
