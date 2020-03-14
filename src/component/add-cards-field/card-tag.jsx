import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

import { Typography } from "@material-ui/core";

import Arrange from "/src/component/arrange";
import { RemoveIcon } from "/src/component/icon";

const Base = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QuantityControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 6px;
`;

const RemoveCopy = styled(RemoveIcon).attrs({
  size: 18
})`
  cursor: pointer;
`;

class CardTag extends React.PureComponent {
  render() {
    const {
      className,
      classNames: { selectedTag, selectedTagName },
      tag: { name: cardName },
      onDelete
    } = this.props;

    return (
      <Base className={classNames(className, selectedTag)}>
        <Content className={selectedTagName}>
          <Arrange>
            <Arrange.Fit>
              <QuantityControls>
                <RemoveCopy onClick={onDelete} />
              </QuantityControls>
            </Arrange.Fit>
            <Arrange.Fill>
              <Typography noWrap={true}>{cardName}</Typography>
            </Arrange.Fill>
          </Arrange>
        </Content>
      </Base>
    );
  }
}

CardTag.propTypes = {
  className: PropTypes.string,
  classNames: PropTypes.shape({
    selectedTag: PropTypes.string,
    selectedTagName: PropTypes.string
  }),
  tag: PropTypes.shape({
    name: PropTypes.string
  }),
  onDelete: PropTypes.func
};

CardTag.defaultProps = {
  className: "",
  classNames: {
    selectedTag: "",
    selectedTagName: ""
  },
  tag: { name: "" },
  onDelete: () => {}
};

export default CardTag;
