import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Draggable } from "react-smooth-dnd";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import omit from "lodash/fp/omit";

import {
  Layers,
  Edit,
  FilePlus,
  Trash2,
  PlusCircle,
  Package
} from "react-feather";

import { CARD_DEFAULT_SCALE, CARD_WIDTH } from "/src/config";
import Arrange from "/src/component/arrange";
import Cards from "/src/component/cards";

const Content = styled(props => {
  const componentProps = omit(["scale"])(props);
  return <div {...componentProps} />;
})`
  min-width: ${flow([get("scale"), multiply(CARD_WIDTH)])}px;
  margin: 0 8px;
`;

const Base = styled(Draggable)`
  &:first-child ${Content} {
    margin-left: 0;
  }

  &:last-child ${Content} {
    margin-right: 0;
  }
`;

const IconStyle = css`
  width: 16px;
  height: 16px;
`;

const StackIcon = styled(Layers)`
  ${IconStyle}
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

class Stack extends React.PureComponent {
  render() {
    const { className, scale, stackId, label } = this.props;
    return (
      <Base className={className}>
        <Content scale={scale}>
          <Arrange>
            <Arrange.Fit>
              <StackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fill>{label} </Arrange.Fill>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <RenameStackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <AddCardIcon />
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
            <Arrange.Fit>&nbsp;&nbsp;&nbsp;</Arrange.Fit>
          </Arrange>
          <Cards stackId={stackId} scale={scale} />
        </Content>
      </Base>
    );
  }
}

Stack.propTypes = {
  className: PropTypes.string,
  scale: PropTypes.number,
  stackId: PropTypes.string,
  label: PropTypes.string
};

Stack.defaultProps = {
  className: "",
  scale: CARD_DEFAULT_SCALE,
  stackId: "",
  label: "Stack"
};

export default Stack;
