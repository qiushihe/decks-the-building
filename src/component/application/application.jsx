import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Grid } from "react-feather";

import WorkspaceSelector from "/src/component/workspace-selector";
import WorkspaceActions from "/src/component/workspace-actions";
import Arrange from "/src/component/arrange";
import Lanes from "/src/component/lanes";

const IconStyle = css`
  width: 16px;
  height: 16px;
`;

const WorkspaceIcon = styled(Grid)`
  ${IconStyle}
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ebeef2;
  padding: 6px 12px 6px 22px;
  margin-bottom: 3px;
  box-shadow: 0 3px 3px -3px #00000069;
  font-size: 14px;
`;

const HeaderContent = styled(Arrange)`
  align-items: center;
`;

class Application extends React.PureComponent {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const { workspaceId } = this.props;
    return (
      <React.Fragment>
        <Header>
          <HeaderContent>
            <Arrange.Fit>
              <WorkspaceIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fill>
              <WorkspaceSelector workspaceId={workspaceId} />
            </Arrange.Fill>
            <Arrange.Fit>
              <WorkspaceActions workspaceId={workspaceId} />
            </Arrange.Fit>
          </HeaderContent>
        </Header>
        <Lanes workspaceId={workspaceId} />
      </React.Fragment>
    );
  }
}

Application.propTypes = {
  workspaceId: PropTypes.string,
  onMount: PropTypes.func
};

Application.defaultProps = {
  workspaceId: "",
  onMount: () => {}
};

export default Application;
