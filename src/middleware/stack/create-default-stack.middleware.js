import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { CREATE, addStacks } from "/src/action/lane.action";
import { create as createStack } from "/src/action/stack.action";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === CREATE) {
      const {
        payload: { id: laneId }
      } = action;

      return flow([
        map(label => ({ id: uuidV4(), label })),
        map(({ id: stackId, label }) =>
          dispatch(createStack({ id: stackId, label })).then(() =>
            dispatch(addStacks({ id: laneId, stackIds: [stackId] }))
          )
        ),
        Promise.all
      ])(["Untitled", "Untitled2"]);
    }
  });
};
