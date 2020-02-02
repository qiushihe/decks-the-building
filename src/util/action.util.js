import { createAction } from "redux-actions";
import Promise from "bluebird";
import pick from "lodash/fp/pick";

export const createPromisedAction = (type, payloadAttrNames, dispatchFn) => {
  const plainAction = createAction(type, pick(payloadAttrNames));

  return payload => (dispatch, getState) =>
    Promise.resolve().then(() =>
      dispatchFn(
        () => dispatch(plainAction(payload)),
        payload,
        dispatch,
        getState
      )
    );
};
