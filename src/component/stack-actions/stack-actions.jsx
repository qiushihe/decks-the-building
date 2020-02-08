import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { Edit, FilePlus, Trash2, PlusCircle, Package } from "react-feather";

import Arrange from "/src/component/arrange";

const IconStyle = css`
  width: 16px;
  height: 16px;
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
    const { className, showAddCardsToStackModal } = this.props;

    return (
      <Arrange className={className}>
        <Arrange.Fit>
          <RenameStackIcon />
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
          <DeleteStackIcon />
        </Arrange.Fit>
        <Arrange.Fit>&nbsp;</Arrange.Fit>
        <Arrange.Fit>
          <CreateStackIcon />
        </Arrange.Fit>
      </Arrange>
    );
  }
}

StackActions.propTypes = {
  className: PropTypes.string,
  showAddCardsToStackModal: PropTypes.func
};

StackActions.defaultProps = {
  className: "",
  showAddCardsToStackModal: () => {}
};

export default StackActions;
