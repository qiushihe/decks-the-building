import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";

import { WORKSPACE, LANE, STACK } from "/src/enum/object.enum";
import BaseModal from "/src/component/modal/base";

const NameableTitle = {
  [WORKSPACE]: "Workspace",
  [LANE]: "Lane",
  [STACK]: "Stack"
};

const Base = styled.div`
  min-width: 250px;
  max-width: 420px;
`;

export class RenameObject extends React.PureComponent {
  constructor(...args) {
    super(...args);

    const { name } = this.props;

    this.state = {
      fieldValue: name || ""
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRename = this.handleRename.bind(this);
  }

  handleFieldChange(evt) {
    this.setState({
      fieldValue: evt.target.value
    });
  }

  handleCancel() {
    const { hideModal } = this.props;
    hideModal();
  }

  handleRename() {
    const { onSubmit } = this.props;
    const { fieldValue } = this.state;
    onSubmit(fieldValue);
  }

  render() {
    const { nameable, name } = this.props;
    const { fieldValue } = this.state;

    return (
      <BaseModal
        renderTitle={() => `Rename ${NameableTitle[nameable]}`}
        renderActions={() => (
          <React.Fragment>
            <Button onClick={this.handleCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleRename} color="primary">
              Rename
            </Button>
          </React.Fragment>
        )}
      >
        <Base>
          <DialogContentText id="alert-dialog-description">
            Enter a new name for the {NameableTitle[nameable]} &quot;{name}
            &quot;:
          </DialogContentText>
          <TextField
            label={`${NameableTitle[nameable]} name`}
            variant="outlined"
            margin="dense"
            fullWidth={true}
            value={fieldValue || ""}
            onChange={this.handleFieldChange}
          />
        </Base>
      </BaseModal>
    );
  }
}

RenameObject.propTypes = {
  hideModal: PropTypes.func,
  onSubmit: PropTypes.func,
  nameable: PropTypes.string,
  name: PropTypes.string
};

RenameObject.defaultProps = {
  hideModal: () => {},
  onSubmit: () => {},
  nameable: "",
  name: ""
};

export default RenameObject;
