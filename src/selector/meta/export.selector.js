import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";
import map from "lodash/fp/map";
import over from "lodash/fp/over";
import flatten from "lodash/fp/flatten";
import identity from "lodash/fp/identity";
import constant from "lodash/fp/constant";
import cond from "lodash/fp/cond";
import eq from "lodash/fp/eq";
import stubTrue from "lodash/fp/stubTrue";
import join from "lodash/fp/join";

import { WORKSPACE, LANE, STACK } from "/src/enum/object.enum";
import { fromProps } from "/src/util/selector.util";

const exportStackCards = stackId =>
  flow([
    get("stack.allStacks"),
    get(stackId),
    get("cards"),
    reduce((result, { id, count }) => [...result, { id, quantity: count }], [])
  ]);

const exportLaneCards = laneId =>
  flow([
    over([
      flow([
        get("lane.allLanes"),
        get(laneId),
        get("stacks"),
        map(get("id")),
        map(exportStackCards),
        over
      ]),
      identity
    ]),
    ([exporter, state]) => exporter(state),
    flatten
  ]);

const exportWorkspaceCards = workspaceId =>
  flow([
    over([
      flow([
        get("workspace.allWorkspaces"),
        get(workspaceId),
        get("lanes"),
        map(get("id")),
        map(exportLaneCards),
        over
      ]),
      identity
    ]),
    ([exporter, state]) => exporter(state),
    flatten
  ]);

const generateCardLines = state => {
  const cardNameById = flow([
    get("card.allCards"),
    reduce((result, { id, name }) => ({ ...result, [id]: name }), {})
  ])(state);

  return map(
    flow([
      over([
        get("quantity"),
        flow([get("id"), get, getter => getter(cardNameById)])
      ]),
      join(" ")
    ])
  );
};

export const exportCards = createSelector(
  fromProps(get("containerType")),
  fromProps(get("containerId")),
  identity,
  (containerType, containerId, state) =>
    flow([
      cond([
        [eq(WORKSPACE), constant(exportWorkspaceCards)],
        [eq(LANE), constant(exportLaneCards)],
        [eq(STACK), constant(exportStackCards)],
        [stubTrue, constant(constant(constant([])))]
      ]),
      getContainerExporter => getContainerExporter(containerId),
      exportContainer => exportContainer(state),
      generateCardLines(state)
    ])(containerType)
);
