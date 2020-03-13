import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import copyToClipboard from "clipboard-copy";
import join from "lodash/fp/join";

import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";

import { WORKSPACE, LANE, STACK } from "/src/enum/object.enum";
import BaseModal from "/src/component/modal/base";

const ContainerTitle = {
  [WORKSPACE]: "Workspace",
  [LANE]: "Lane",
  [STACK]: "Stack"
};

const Base = styled.div`
  min-width: 250px;
  max-width: 420px;
`;

const CardLines = styled.div`
  min-width: 400px;
  max-height: 200px;
  overflow: auto;
  border: 1px solid #6c6d6f;
  padding: 3px 6px;

  pre {
    margin: 0;
    cursor: default;
  }
`;

const StatusText = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-top: 6px;
`;

export class ExportCards extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      copiedIntoClipboard: false
    };

    this.cardLinesRef = React.createRef();

    this.handleDone = this.handleDone.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDone() {
    const { hideModal } = this.props;
    hideModal();
  }

  handleClick() {
    const { current } = this.cardLinesRef;
    if (current) {
      const range = document.createRange();
      range.selectNode(current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      copyToClipboard(this.getCardLinesString()).then(() => null);
      this.setState({ copiedIntoClipboard: true });
    }
  }

  getCardLinesString() {
    const { exportedCards } = this.props;
    return join("\n")(exportedCards);
  }

  render() {
    const { containerType, containerName } = this.props;
    const { copiedIntoClipboard } = this.state;

    return (
      <BaseModal
        renderTitle={() => `Export ${ContainerTitle[containerType]} Cards`}
        renderActions={() => (
          <Button onClick={this.handleDone} color="primary">
            Done
          </Button>
        )}
      >
        <Base>
          <DialogContentText>
            Click on the list below to copy cards from{" "}
            {ContainerTitle[containerType]} &quot;{containerName}&quot; into
            clipboard:
          </DialogContentText>
          <CardLines>
            <pre ref={this.cardLinesRef} onClick={this.handleClick}>
              {this.getCardLinesString()}
            </pre>
          </CardLines>
          {copiedIntoClipboard && (
            <StatusText>Content copied into clipboard.</StatusText>
          )}
        </Base>
      </BaseModal>
    );
  }
}

ExportCards.propTypes = {
  hideModal: PropTypes.func,
  exportedCards: PropTypes.arrayOf(PropTypes.string),
  containerType: PropTypes.string,
  containerName: PropTypes.string
};

ExportCards.defaultProps = {
  hideModal: () => {},
  exportedCards: [],
  containerType: "",
  containerName: ""
};

export default ExportCards;
