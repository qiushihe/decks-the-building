import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

import { Typography } from "@material-ui/core";

import { DeleteIcon } from "/src/component/icon";

const Base = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DeleteEntry = styled(DeleteIcon).attrs({
  size: 18
})`
  cursor: pointer;
  margin: 0px 3px 2px 3px;
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
          <DeleteEntry onClick={onDelete} />
          <Typography noWrap={true}>{cardName}</Typography>
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
