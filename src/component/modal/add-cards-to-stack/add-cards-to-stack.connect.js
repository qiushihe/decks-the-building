import { connect } from "react-redux";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import trim from "lodash/fp/trim";
import split from "lodash/fp/split";
import map from "lodash/fp/map";

import { add as addCards } from "/src/action/card.action";
import { addCards as addCardsToStack } from "/src/action/stack.action";

import AddCardsToStack from "./add-cards-to-stack";

export default connect(
  null,
  dispatch => ({
    addCards: ({ names }) => dispatch(addCards({ names })),
    addCardsToStack: ({ id, cardIds }) =>
      dispatch(addCardsToStack({ id, cardIds }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: flow([
      trim,
      split("\n"),
      map(trim),
      names =>
        dispatchProps
          .addCards({ names })
          .then(
            flow([
              get("payload.cards"),
              map(get("id")),
              cardIds => ({ id: ownProps.stackId, cardIds }),
              dispatchProps.addCardsToStack
            ])
          )
          .then(ownProps.hideModal)
    ])
  })
)(AddCardsToStack);
