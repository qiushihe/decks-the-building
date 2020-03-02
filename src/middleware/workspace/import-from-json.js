import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import isEmpty from "lodash/fp/isEmpty";
import constant from "lodash/fp/constant";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";

import {
  create as createStack,
  addCards as addCardsToStack,
  changeCardCopies as changeCopiesOfCardInStack
} from "/src/action/stack.action";

import {
  create as createLane,
  addStacks as addStacksToLane
} from "/src/action/lane.action";

import {
  create as createWorkspace,
  addLanes as addLanesToWorkspace
} from "/src/action/workspace.action";

import { add as addCard } from "/src/action/card.action";

const uncappedReduce = reduce.convert({ cap: false });

export default (dispatch, data) => {
  const restoreStackData = ({ id, label, cards }) => {
    const restoreCardsPromise = flow([
      map(get("name")),
      names =>
        isEmpty(names) ? Promise.resolve() : dispatch(addCard({ names }))
    ])(cards);

    const cardCountChanges = uncappedReduce(
      (result, { name, count }, index) =>
        count - 1 > 0
          ? [
              ...result,
              {
                name,
                cardIndex: index,
                change: count - 1
              }
            ]
          : result,
      []
    )(cards);

    return restoreCardsPromise
      .then(flow([get("payload.cards"), map(get("id"))]))
      .then(cardIds =>
        dispatch(createStack({ id, label, cardIds })).then(() =>
          isEmpty(cardIds)
            ? Promise.resolve()
            : dispatch(addCardsToStack({ id, cardIds }))
        )
      )
      .then(() =>
        isEmpty(cardCountChanges)
          ? Promise.resolve()
          : flow([
              map(({ cardIndex, change }) =>
                dispatch(
                  changeCopiesOfCardInStack({
                    id,
                    cardIndex,
                    change
                  })
                )
              ),
              Promise.all
            ])(cardCountChanges)
      )
      .then(constant(id));
  };

  const restoreLaneData = ({ id, label, stacks }) => {
    const restoreStacksPromise = flow([map(restoreStackData), Promise.all])(
      stacks
    );

    return restoreStacksPromise
      .then(stackIds =>
        dispatch(createLane({ id, label, stackIds })).then(() =>
          dispatch(addStacksToLane({ id, stackIds }))
        )
      )
      .then(constant(id));
  };

  const restoreWorkspaceData = ({ id, label, lanes }) => {
    const restoreLanesPromise = flow([map(restoreLaneData), Promise.all])(
      lanes
    );

    return restoreLanesPromise
      .then(laneIds =>
        dispatch(createWorkspace({ id, label, laneIds })).then(() =>
          isEmpty(laneIds)
            ? Promise.resolve()
            : dispatch(addLanesToWorkspace({ id, laneIds }))
        )
      )
      .then(constant(id));
  };

  return restoreWorkspaceData(data);
};
