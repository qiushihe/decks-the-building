import Promise from "bluebird";
import isEmpty from "lodash/fp/isEmpty";

import { RESTORE_FROM_SCRYFALL } from "/src/action/card.action";
import { login } from "/src/selector/s3.selector";
import { getS3Client } from "/src/api/s3.api";

export default ({ getState }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === RESTORE_FROM_SCRYFALL) {
      const {
        payload: { id: cardId, ...restPayload }
      } = action;

      const newState = getState();
      const s3Login = login(newState);

      if (!isEmpty(s3Login)) {
        return getS3Client({ login: s3Login }).uploadJson(
          `cards/${cardId}.json`,
          restPayload
        );
      }
    }
  });
};
