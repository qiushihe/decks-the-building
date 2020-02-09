import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import first from "lodash/fp/first";
import get from "lodash/fp/get";

import { hasWorkspaces } from "/src/selector/workspace.selector";
import { READY } from "/src/action/app.action";

import {
  create as createWorkspace,
  activate as activateWorkspace
} from "/src/action/workspace.action";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === READY) {
      const newState = getState();

      if (!hasWorkspaces(newState)) {
        return flow([
          map(label => ({ id: uuidV4(), label })),
          map(({ id: workspaceId, label }) =>
            dispatch(createWorkspace({ id: workspaceId, label }))
          ),
          Promise.all
        ])(["Untitled"]).then(
          flow([
            first,
            get("payload.id"),
            workspaceId => dispatch(activateWorkspace({ id: workspaceId }))
          ])
        );
      }
    }
  });
};
