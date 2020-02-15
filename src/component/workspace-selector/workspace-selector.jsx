import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import uuidV4 from "uuid/v4";
import map from "lodash/fp/map";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Option from "./option.connect";

const Base = styled.div``;

const StyledInputLabel = styled(InputLabel)`
  white-space: nowrap;
`;

const StyledSelect = styled(Select)`
  width: 250px;
`;

class WorkspaceSelector extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      labelWidth: 0
    };

    this.inputId = uuidV4();
    this.inputLabelRef = React.createRef();
  }

  componentDidUpdate() {
    const { current: inputLabelElm } = this.inputLabelRef;

    this.setState({
      labelWidth: inputLabelElm.offsetWidth
    });
  }

  render() {
    const { workspaceIds, workspaceId, activate } = this.props;
    const { labelWidth } = this.state;

    return (
      <Base>
        <FormControl variant="outlined" margin="dense">
          <StyledInputLabel ref={this.inputLabelRef} htmlFor={this.inputId}>
            Workspace Name
          </StyledInputLabel>
          <StyledSelect
            native
            value={workspaceId || ""}
            onChange={evt => activate({ id: evt.target.value })}
            labelWidth={labelWidth}
            inputProps={{ id: this.inputId }}
          >
            {map(id => <Option key={id} workspaceId={id} />)(workspaceIds)}
          </StyledSelect>
        </FormControl>
      </Base>
    );
  }
}

WorkspaceSelector.propTypes = {
  workspaceIds: PropTypes.array,
  workspaceId: PropTypes.string,
  activate: PropTypes.func
};

WorkspaceSelector.defaultProps = {
  workspaceIds: [],
  workspaceId: "",
  activate: () => {}
};

export default WorkspaceSelector;
