import Promise from "bluebird";
import uuidV4 from "uuid/v4";

import { CREATE } from "/src/action/lane.action";
import { create as createStack } from "/src/action/stack.action";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === CREATE) {
      const {
        payload: { id: laneId }
      } = action;

      dispatch(createStack({ id: uuidV4(), laneId, label: "Untitled" }));
    }
  });
};
