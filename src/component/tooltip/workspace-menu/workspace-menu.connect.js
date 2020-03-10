import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import WorkspaceMenu from "./workspace-menu";

export default connect(createStructuredSelector({}))(WorkspaceMenu);
