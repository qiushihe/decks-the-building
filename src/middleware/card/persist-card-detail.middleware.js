import Promise from "bluebird";

import { RESTORE_FROM_SCRYFALL } from "/src/action/card.action";
import { getS3Client } from "/src/api/s3.api";

export default () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === RESTORE_FROM_SCRYFALL) {
      const {
        payload: { id: cardId, ...cardDetail }
      } = action;

      const s3Client = getS3Client();

      return s3Client.isLoggedIn().then(loggedIn => {
        if (loggedIn) {
          return s3Client.storeCardById(cardId, cardDetail);
        }
      });
    }
  });
};
