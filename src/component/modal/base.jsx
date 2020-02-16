import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import isFunction from "lodash/fp/isFunction";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Base = styled.div`
  .MuiDialogContent-root {
    overflow-y: visible !important;
  }
`;

export class BaseModal extends React.PureComponent {
  render() {
    const { children, renderTitle, renderActions } = this.props;

    return (
      <Base>
        {isFunction(renderTitle) && <DialogTitle>{renderTitle()}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
        {isFunction(renderActions) && (
          <DialogActions>{renderActions()}</DialogActions>
        )}
      </Base>
    );
  }
}

BaseModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  renderTitle: PropTypes.func,
  renderActions: PropTypes.func
};

BaseModal.defaultProps = {
  children: null,
  renderTitle: null,
  renderActions: null
};

export default BaseModal;
