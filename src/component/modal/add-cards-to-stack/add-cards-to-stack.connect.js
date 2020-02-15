import Promise from "bluebird";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import map from "lodash/fp/map";
import reduce from "lodash/fp/reduce";

import { stackCardEntriesCount } from "/src/selector/stack.selector";
import { add as addCards } from "/src/action/card.action";

import {
  addCards as addCardsToStack,
  changeCardCopies as changeCardCopiesInStack
} from "/src/action/stack.action";

import AddCardsToStack from "./add-cards-to-stack";

const cardLineRegexp = new RegExp(
  "^((?<copies>\\d*)(\\s*.)?\\s+)?(?<name>.+)$"
);

const uncappedMap = map.convert({ cap: false });

export default connect(
  createStructuredSelector({
    entriesCount: stackCardEntriesCount
  }),
  dispatch => ({
    addCards: ({ names }) => dispatch(addCards({ names })),
    addCardsToStack: ({ id, cardIds }) =>
      dispatch(addCardsToStack({ id, cardIds })),
    changeCardCopiesInStack: ({ id, cardIndex, change }) =>
      dispatch(
        changeCardCopiesInStack({
          id,
          cardIndex,
          change
        })
      )
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: flow([
      map(name => name.match(cardLineRegexp).groups),
      map(({ copies, name }) => ({ copies: parseInt(copies) || 1, name })),
      cards => {
        const copiesByCardName = reduce(
          (result, { copies, name }) => ({
            ...result,
            [name]: copies
          }),
          {}
        )(cards);

        return dispatchProps
          .addCards({ names: map(get("name"))(cards) })
          .then(action => {
            const actionCards = getOr([], "payload.cards")(action);

            return dispatchProps
              .addCardsToStack({
                id: ownProps.stackId,
                cardIds: map(get("id"))(actionCards)
              })
              .then(() =>
                flow([
                  uncappedMap(({ name }, index) => ({
                    cardIndex: stateProps.entriesCount + index,
                    copies: getOr(1, name)(copiesByCardName)
                  })),
                  map(({ cardIndex, copies }) =>
                    copies - 1 > 0
                      ? { cardIndex, change: copies - 1 }
                      : { cardIndex, change: 0 }
                  ),
                  map(({ cardIndex, change }) =>
                    change > 0
                      ? dispatchProps.changeCardCopiesInStack({
                          id: ownProps.stackId,
                          cardIndex,
                          change
                        })
                      : Promise.resolve()
                  ),
                  Promise.all
                ])(actionCards)
              );
          })
          .then(ownProps.hideModal);
      }
    ])
  })
)(AddCardsToStack);
