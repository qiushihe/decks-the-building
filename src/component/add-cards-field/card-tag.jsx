import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

const Base = styled.div``;

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
        <div className={selectedTagName}>
          {cardName}
          <a onClick={onDelete}>X</a>
        </div>
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
