import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { CREATE, addStacks } from "/src/action/lane.action";
import { create as createStack } from "/src/action/stack.action";
import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";

export default contextualMiddleware({}, ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === CREATE) {
      const {
        payload: { id: laneId },
        context: { actionLifecycle } = {}
      } = action;

      if (actionLifecycle !== APP_READY) {
        return flow([
          map(label => ({ id: uuidV4(), label })),
          map(({ id: stackId, label }) =>
            dispatch(createStack({ id: stackId, label })).then(() =>
              dispatch(addStacks({ id: laneId, stackIds: [stackId] }))
            )
          ),
          Promise.all
        ])(["Untitled"]);
      }
    }
  });
});
