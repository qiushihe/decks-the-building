import Promise from "bluebird";
import map from "lodash/fp/map";

import { BOOT } from "/src/action/app.action";
import { add as addCard } from "/src/action/card.action";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === BOOT) {
      return map(name => dispatch(addCard({ name })))([
        "Scornful Aether-Lich",
        "Crossroads Consecrator",
        "Dream Trawler",
        "Razortip Whip",
        "Absorb Vis"
      ]);
    }
  });
};
