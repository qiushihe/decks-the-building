import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Arrange from "/src/component/arrange";

import {
  RenameIcon,
  CreateIcon,
  DeleteIcon,
  AddCardsIcon,
  CombineCardsIcon
} from "/src/component/icon";

const IconStyle = css`
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const RenameStack = styled(RenameIcon)`
  ${IconStyle}
`;

const AddCardsToStack = styled(AddCardsIcon)`
  ${IconStyle}
`;

const DeleteStack = styled(DeleteIcon)`
  ${IconStyle}
`;

const CombineCardsInStack = styled(CombineCardsIcon)`
  ${IconStyle}
`;

const CreateStack = styled(CreateIcon)`
  ${IconStyle}
`;

class StackActions extends React.PureComponent {
  render() {
    const {
      className,
      addCardsToStack,
      combineDuplicateCards,
      renameStack,
      createStack,
      removeStack
    } = this.props;

    return (
      <div className={className}>
        <Arrange>
          <Arrange.Fit>
            <RenameStack onClick={renameStack} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <AddCardsToStack onClick={addCardsToStack} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <CombineCardsInStack onClick={combineDuplicateCards} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <DeleteStack onClick={removeStack} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <CreateStack onClick={createStack} />
          </Arrange.Fit>
        </Arrange>
      </div>
    );
  }
}

StackActions.propTypes = {
  className: PropTypes.string,
  addCardsToStack: PropTypes.func,
  combineDuplicateCards: PropTypes.func,
  renameStack: PropTypes.func,
  createStack: PropTypes.func,
  removeStack: PropTypes.func
};

StackActions.defaultProps = {
  className: "",
  addCardsToStack: () => {},
  combineDuplicateCards: () => {},
  renameStack: () => {},
  createStack: () => {},
  removeStack: () => {}
};

export default StackActions;
