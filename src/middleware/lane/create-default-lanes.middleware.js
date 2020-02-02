import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import cond from "lodash/fp/cond";
import isEmpty from "lodash/fp/isEmpty";

import { BOOT } from "/src/action/app.action";
import { create as createLane } from "/src/action/lane.action";
import { allLanes } from "/src/selector/lane.selector";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    const newState = getState();

    if (actionType === BOOT) {
      flow([
        allLanes,
        cond([
          [
            isEmpty,
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
