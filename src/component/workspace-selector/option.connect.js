import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { workspaceLabel } from "/src/selector/workspace.selector";

import Option from "./option";

export default connect(
  createStructuredSelector({
    label: workspaceLabel
  })
)(Option);
