import Promise from "bluebird";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/fp/map";
import isEmpty from "lodash/fp/isEmpty";

import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import Select from "@material-ui/core/Select";

import BaseModal from "/src/component/modal/base";

import WorkspacesList from "./workspaces-list.connect";

const SYNC_OPT_IMPORT_AS_CURRENT = "SYNC_OPT_IMPORT_AS_CURRENT";
const SYNC_OPT_IMPORT_AS_NEW = "SYNC_OPT_IMPORT_AS_NEW";
const SYNC_OPT_EXPORT_AS_SELECTED = "SYNC_OPT_EXPORT_AS_SELECTED";
const SYNC_OPT_EXPORT_AS_NEW = "SYNC_OPT_EXPORT_AS_NEW";

const SYNC_OPT_LABEL = {
  [SYNC_OPT_IMPORT_AS_CURRENT]:
    "Import selected workspace to replace current workspace",
  [SYNC_OPT_IMPORT_AS_NEW]: "Import selected workspace as a new workspace",
  [SYNC_OPT_EXPORT_AS_SELECTED]:
    "Export current workspace to overwrite selected workspace",
  [SYNC_OPT_EXPORT_AS_NEW]: "Export current workspace as a new workspace"
};

const Spacer = styled.div`
  display: flex;
  height: 16px;
`;

export class SyncOperationForm extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      operation: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOperationChange = this.handleOperationChange.bind(this);
  }

  handleSubmit() {
    const {
      onComplete,
      replaceCurrentWithSelected,
      openSelectedAsNew,
      saveCurrentToSelected,
      saveCurrentAsNew
    } = this.props;

    const { operation } = this.state;

    let operationFn = () => Promise.resolve();
    if (operation === SYNC_OPT_IMPORT_AS_CURRENT) {
      operationFn = replaceCurrentWithSelected;
    } else if (operation === SYNC_OPT_IMPORT_AS_NEW) {
      operationFn = openSelectedAsNew;
    } else if (operation === SYNC_OPT_EXPORT_AS_SELECTED) {
      operationFn = saveCurrentToSelected;
    } else if (operation === SYNC_OPT_EXPORT_AS_NEW) {
      operationFn = saveCurrentAsNew;
    }

    operationFn().then(onComplete);
  }

  handleOperationChange(evt) {
    this.setState({
      operation: evt.target.value
    });
  }

  render() {
    const { hasLocal, hasRemote, onCancel } = this.props;

    const { operation } = this.state;

    const optDisabled = {
      [SYNC_OPT_IMPORT_AS_CURRENT]: !hasLocal || !hasRemote,
      [SYNC_OPT_IMPORT_AS_NEW]: !hasRemote,
      [SYNC_OPT_EXPORT_AS_SELECTED]: !hasLocal || !hasRemote,
      [SYNC_OPT_EXPORT_AS_NEW]: !hasLocal
    };

    return (
      <BaseModal
        renderTitle={() => "Workspaces in the Cloud"}
        renderActions={() => (
          <React.Fragment>
            <Button onClick={onCancel} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              disabled={isEmpty(operation)}
            >
              Submit
            </Button>
          </React.Fragment>
        )}
      >
        <DialogContentText>
          Select a remote workspace from the list below:
        </DialogContentText>
        <WorkspacesList />
        <Spacer />
        <DialogContentText>Select an operation to perform:</DialogContentText>
        <Select
          native
          variant="outlined"
          value={operation || ""}
          onChange={this.handleOperationChange}
          fullWidth={true}
        >
          {isEmpty(operation) && (
            <option value="">-- No Operation Selected --</option>
          )}
          {map(opt => (
            <option key={opt} value={opt} disabled={optDisabled[opt]}>
              {SYNC_OPT_LABEL[opt]}
            </option>
          ))([
            SYNC_OPT_IMPORT_AS_CURRENT,
            SYNC_OPT_IMPORT_AS_NEW,
            SYNC_OPT_EXPORT_AS_SELECTED,
            SYNC_OPT_EXPORT_AS_NEW
          ])}
        </Select>
      </BaseModal>
    );
  }
}

SyncOperationForm.propTypes = {
  hasLocal: PropTypes.bool,
  hasRemote: PropTypes.bool,
  onComplete: PropTypes.func,
  onCancel: PropTypes.func,
  replaceCurrentWithSelected: PropTypes.func,
  openSelectedAsNew: PropTypes.func,
  saveCurrentToSelected: PropTypes.func,
  saveCurrentAsNew: PropTypes.func
};

SyncOperationForm.defaultProps = {
  hasLocal: false,
  hasRemote: false,
  onComplete: () => {},
  onCancel: () => {},
  replaceCurrentWithSelected: () => {},
  openSelectedAsNew: () => {},
  saveCurrentToSelected: () => {},
  saveCurrentAsNew: () => {}
};

export default SyncOperationForm;
