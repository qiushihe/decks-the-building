import { createAction } from "redux-actions";
import Promise from "bluebird";
import flow from "lodash/fp/flow";
import pick from "lodash/fp/pick";
import cond from "lodash/fp/cond";
import isFunction from "lodash/fp/isFunction";
import stubTrue from "lodash/fp/stubTrue";
import identity from "lodash/fp/identity";
import constant from "lodash/fp/constant";

export const createPromisedAction = (type, payloadAttrs, dispatchFn) => {
  const actionCreator = createAction(
    type,
    isFunction(payloadAttrs) ? payloadAttrs : pick(payloadAttrs)
  );

  return inputPayload => (dispatch, getState) =>
    Promise.resolve().then(() =>
      dispatchFn(
        payloadMutator =>
          Promise.resolve(actionCreator(inputPayload))
            .then(plainAction => ({
              ...plainAction,
              payload: flow([
                cond([
                  [isFunction, identity],
                  [stubTrue, constant(identity)]
                ]),
                mutate => mutate(plainAction.payload)
              ])(payloadMutator)
            }))
            .then(action => {
              dispatch(action);
              return action;
            }),
        inputPayload,
        dispatch,
        getState
      )
    );
};
