import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { CREATE, addLanes } from "/src/action/workspace.action";
import { create as createLane } from "/src/action/lane.action";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === CREATE) {
      const {
        payload: { id: workspaceId }
      } = action;

      return flow([
        map(label => ({ id: uuidV4(), label })),
        map(({ id: laneId, label }) => {
          return dispatch(createLane({ id: laneId, label })).then(() => {
            return dispatch(addLanes({ id: workspaceId, laneIds: [laneId] }));
          });
        }),
        Promise.all
      ])(["Untitled", "Untitled2"]);
    }
  });
};
