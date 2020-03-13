import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";

import { WORKSPACE, LANE, STACK } from "/src/enum/object.enum";
import BaseModal from "/src/component/modal/base";

const RemovableTitle = {
  [WORKSPACE]: "Workspace",
  [LANE]: "Lane",
  [STACK]: "Stack"
};

const Base = styled.div``;

export class RemoveObject extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleCancel() {
    const { hideModal } = this.props;
    hideModal();
  }

  handleRemove() {
    const { onSubmit } = this.props;
    onSubmit();
  }

  render() {
    const { removable, name } = this.props;

    return (
      <BaseModal
        renderTitle={() => `Remove ${RemovableTitle[removable]}?`}
        renderActions={() => (
          <React.Fragment>
            <Button onClick={this.handleCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleRemove} color="primary">
              Remove
            </Button>
          </React.Fragment>
        )}
      >
        <Base>
          <DialogContentText>
            Are you sure you want to delete {RemovableTitle[removable]} &quot;
            {name}
            &quot;?
          </DialogContentText>
        </Base>
      </BaseModal>
    );
  }
}

RemoveObject.propTypes = {
  hideModal: PropTypes.func,
  onSubmit: PropTypes.func,
  removable: PropTypes.string,
  name: PropTypes.string
};

RemoveObject.defaultProps = {
  hideModal: () => {},
  onSubmit: () => {},
  removable: "",
  name: ""
};

export default RemoveObject;
