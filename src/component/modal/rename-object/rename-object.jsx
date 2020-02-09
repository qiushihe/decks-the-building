import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { WORKSPACE, LANE, STACK } from "/src/enum/nameable.enum";
import Arrange from "/src/component/arrange";
import BaseModal from "/src/component/modal/base";

const Header = styled.div``;

const NameableTitle = {
  [WORKSPACE]: "Workspace",
  [LANE]: "Lane",
  [STACK]: "Stack"
};

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
    const { nameable } = this.props;
    const { fieldValue } = this.state;

    return (
      <BaseModal>
        <Arrange vertical={true}>
          <Arrange.Fit>
            <Header>Rename {NameableTitle[nameable]}</Header>
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <input
              type="text"
              value={fieldValue || ""}
              onChange={this.handleFieldChange}
            />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <Arrange>
              <Arrange.Fill>&nbsp;</Arrange.Fill>
              <Arrange.Fit>
                <button onClick={this.handleCancel}>Cancel</button>
              </Arrange.Fit>
              <Arrange.Fit>&nbsp;&nbsp;</Arrange.Fit>
              <Arrange.Fit>
                <button onClick={this.handleRename}>Rename</button>
              </Arrange.Fit>
            </Arrange>
          </Arrange.Fit>
        </Arrange>
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
