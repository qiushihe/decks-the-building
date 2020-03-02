import Promise from "bluebird";
import { Mutex } from "async-mutex";
import isNil from "lodash/fp/isNil";

import { getLocalForgeClient } from "/src/api/localforge.api";

const DEFERRED_SAVE_INTERVAL = 1000;
const DEFERRED_SAVE_DELAY = 10;

class SaveToLocalService {
  constructor() {
    this.localForge = getLocalForgeClient();

    this.deferredSave = {};
  }

  save(workspaceId, workspaceData) {
    if (isNil(this.deferredSave[workspaceId])) {
      this.deferredSave[workspaceId] = {
        mutex: new Mutex(),
        id: null,
        data: null,
        timeout: null,
        promise: null,
        resolve: null,
        reject: null
      };
    }

    const deferred = this.deferredSave[workspaceId];

    return deferred.mutex.acquire().then(release => {
      deferred.id = workspaceId;
      deferred.data = workspaceData;

      if (isNil(deferred.promise)) {
        deferred.promise = new Promise((resolve, reject) => {
          deferred.resolve = resolve;
          deferred.reject = reject;
        });
      }

      if (!isNil(deferred.timeout)) {
        clearTimeout(deferred.timeout);
        deferred.timeout = null;
      }

      deferred.timeout = setTimeout(
        () =>
          this.localForge
            .storeWorkspaceById(deferred.id, deferred.data)
            .then(deferred.resolve)
            .catch(deferred.reject)
            .finally(() => {
              deferred.id = null;
              deferred.data = null;
              deferred.timeout = null;
              deferred.promise = null;
              deferred.resolve = null;
              deferred.reject = null;
            }),
        DEFERRED_SAVE_INTERVAL
      );

      setTimeout(release, DEFERRED_SAVE_DELAY);
      return deferred.promise;
    });
  }
}

let DefaultInstance = null;

export const getSaveToLocalService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new SaveToLocalService();
  }
  return DefaultInstance;
};
