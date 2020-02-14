import Promise from "bluebird";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import WorkspacesList from "../workspaces-list";

const Base = styled.div``;

const Operations = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
`;

const OperationsGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 6px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const OperationButton = styled.button`
  display: flex;
  white-space: normal;
  width: 160px;
  height: 80px;
  font-size: 14px;
  margin: 0 6px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export class SyncOperationForm extends React.PureComponent {
  render() {
    const {
      hasLocal,
      hasRemote,
      onComplete,
      onCancel,
      replaceCurrentWithSelected,
      openSelectedAsNew,
      saveCurrentToSelected,
      saveCurrentAsNew
    } = this.props;

    const withComplete = operationFn => () =>
      Promise.resolve()
        .then(() => operationFn())
        .then(() => onComplete());

    return (
      <Base>
        <div>Available Remote Workspaces</div>
        <WorkspacesList />
        <Operations>
          <OperationsGroup>
            <OperationButton
              onClick={withComplete(replaceCurrentWithSelected)}
              disabled={!hasLocal || !hasRemote}
            >
              Replace Current Workspace with Selected Workspace
            </OperationButton>
            <OperationButton
              onClick={withComplete(openSelectedAsNew)}
              disabled={!hasRemote}
            >
              Open Selected Workspace as New Workspace
            </OperationButton>
          </OperationsGroup>
          <OperationsGroup>
            <OperationButton
              onClick={withComplete(saveCurrentToSelected)}
              disabled={!hasLocal || !hasRemote}
            >
              Save Current Workspace to Selected Workspace
            </OperationButton>
            <OperationButton
              onClick={withComplete(saveCurrentAsNew)}
              disabled={!hasLocal}
            >
              Save Current Workspace as New Workspace
            </OperationButton>
          </OperationsGroup>
        </Operations>
        <div>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </Base>
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
