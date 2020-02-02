import { createAction } from "redux-actions";
import Promise from "bluebird";
import pick from "lodash/fp/pick";

export const createPromisedAction = (type, payloadAttrNames, dispatchFn) => {
  const plainAction = createAction(type, pick(payloadAttrNames));

  return payload => (dispatch, getState) =>
    Promise.resolve().then(() =>
      dispatchFn(
        (morePayload = {}) => {
          const action = plainAction(payload);
          return dispatch({
            ...action,
            payload: {
              ...action.payload,
              ...morePayload
            }
          });
        },
        payload,
        dispatch,
        getState
      )
    );
};
