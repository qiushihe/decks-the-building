import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import S3Login from "/src/component/s3-login";
import WorkspaceSelector from "/src/component/workspace-selector";
import WorkspaceActions from "/src/component/workspace-actions";
import Lanes from "/src/component/lanes";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ebeef2;
  padding: 6px 12px;
  margin-bottom: 3px;
  box-shadow: 0 3px 3px -3px #00000069;
  font-size: 14px;
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
          <WorkspaceSelector workspaceId={workspaceId} />
          &nbsp;&nbsp;&nbsp;
          <WorkspaceActions workspaceId={workspaceId} />
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <S3Login />
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
