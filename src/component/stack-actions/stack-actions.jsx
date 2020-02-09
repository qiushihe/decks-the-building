import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { Edit, FilePlus, Trash2, PlusCircle, Package } from "react-feather";

import Arrange from "/src/component/arrange";

const IconStyle = css`
  width: 16px;
  height: 16px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const RenameStackIcon = styled(Edit)`
  ${IconStyle}
`;

const AddCardIcon = styled(FilePlus)`
  ${IconStyle}
`;

const DeleteStackIcon = styled(Trash2)`
  ${IconStyle}
`;

const TidyStackIcon = styled(Package)`
  ${IconStyle}
`;

const CreateStackIcon = styled(PlusCircle)`
  ${IconStyle}
`;

class StackActions extends React.PureComponent {
  render() {
    const {
      className,
      showAddCardsToStackModal,
      renameStack,
      createStack,
      removeStack
    } = this.props;

    return (
      <div className={className}>
        <Arrange>
          <Arrange.Fit>
            <RenameStackIcon onClick={renameStack} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <AddCardIcon onClick={showAddCardsToStackModal} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <TidyStackIcon />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <DeleteStackIcon onClick={removeStack} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <CreateStackIcon onClick={createStack} />
          </Arrange.Fit>
        </Arrange>
      </div>
    );
  }
}

StackActions.propTypes = {
  className: PropTypes.string,
  showAddCardsToStackModal: PropTypes.func,
  renameStack: PropTypes.func,
  createStack: PropTypes.func,
  removeStack: PropTypes.func
};

StackActions.defaultProps = {
  className: "",
  showAddCardsToStackModal: () => {},
  renameStack: () => {},
  createStack: () => {},
  removeStack: () => {}
};

export default StackActions;
