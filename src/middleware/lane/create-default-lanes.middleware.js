import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import cond from "lodash/fp/cond";
import identity from "lodash/fp/identity";
import negate from "lodash/fp/negate";

import { BOOT } from "/src/action/app.action";
import { create as createLane } from "/src/action/lane.action";
import { hasLanes } from "/src/selector/lane.selector";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === BOOT) {
      const newState = getState();

      return flow([
        hasLanes,
        cond([
          [
            negate(identity),
            () =>
              map(label => dispatch(createLane({ id: uuidV4(), label })))([
                "Library",
                "Deck"
              ])
          ]
        ])
      ])(newState);
    }
  });
};
