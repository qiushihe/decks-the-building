import Promise from "bluebird";

import { BOOT } from "/src/action/app.action";
import { add as addCards } from "/src/action/card.action";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === BOOT) {
      return dispatch(
        addCards({
          names: [
            "Scornful Aether-Lich",
            "Crossroads Consecrator",
            "Dream Trawler",
            "Razortip Whip",
            "Absorb Vis"
          ]
        })
      );
    }
  });
};
