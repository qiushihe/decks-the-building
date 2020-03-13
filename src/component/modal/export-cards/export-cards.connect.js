import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { exportCards } from "/src/selector/meta/export.selector";

import ExportCards from "./export-cards";

export default connect(
  createStructuredSelector({
    exportedCards: exportCards
  })
)(ExportCards);
