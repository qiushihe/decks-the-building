import { connect } from "react-redux";
import getOr from "lodash/fp/getOr";

import { show } from "/src/action/tooltip.action";
import { deferred } from "/src/util/function.util";

import ActionsHeader from "./actions-header";

export default connect(
  null,
  dispatch => ({
    showMenu: ({ id, name, props }) =>
      deferred(dispatch)(show({ id, name, props }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    showMenu: tooltipId =>
      dispatchProps.showMenu({
        id: tooltipId,
        name: ownProps.menuName,
        props: getOr({}, "menuProps")(ownProps)
      })
  })
)(ActionsHeader);
