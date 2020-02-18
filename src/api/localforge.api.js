import Promise from "bluebird";
import LocalForage from "localforage";
import without from "lodash/fp/without";
import map from "lodash/fp/map";
import flow from "lodash/fp/flow";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import concat from "lodash/fp/concat";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";

LocalForage.config({
  name: "Decks the Building",
  driver: [LocalForage.INDEXEDDB, LocalForage.WEBSQL, LocalForage.LOCALSTORAGE]
});

const forALlRecords = ({ storageEngine } = {}) => {
  const engine = storageEngine || LocalForage;

  return {
    iterate: (iteratorCallback, successCallback) => {
      return engine.iterate(iteratorCallback, successCallback);
    }
  };
};

const getRecord = (model, id, { storageEngine } = {}) => {
  const engine = storageEngine || LocalForage;

  return {
    exists: () => engine.getItem(`${model}:${id}`).then(negate(isEmpty)),
    getAttrs: () => engine.getItem(`${model}:${id}::__attrs`),
    getAttr: name => engine.getItem(`${model}:${id}::${name}`),
    setAttr: (name, value) => {
      if (name === "__attrs") {
        throw new Error("Invalid record attribute name!");
      }

      return engine
        .getItem(`${model}:${id}::__attrs`)
        .then(attrs =>
          engine.setItem(
            `${model}:${id}::__attrs`,
            flow([concat([name]), compact, uniq])(attrs)
          )
        )
        .then(() => engine.setItem(`${model}:${id}::${name}`, value))
        .then(() => engine.setItem(`${model}:${id}`, id));
    },
    deleteAttr: name => {
      return engine
        .removeItem(`${model}:${id}::${name}`)
        .then(() => engine.getItem(`${model}:${id}::__attrs`))
        .then(attrs =>
          engine.setItem(`${model}:${id}::__attrs`, without(name)(attrs || []))
        );
    },
    deleteRecord: () => {
      return engine
        .getItem(`${model}:${id}::__attrs`)
        .then(
          flow([
            map(name => engine.removeItem(`${model}:${id}::${name}`)),
            Promise.all
          ])
        )
        .then(() => engine.removeItem(`${model}:${id}::__attrs`))
        .then(() => engine.removeItem(`${model}:${id}`));
    }
  };
};

class LocalForgeClient {
  storeAllCardNames(version, data) {
    return this.storeById("Catalog", `CardNames-${version}`, data);
  }

  fetchAllCardNames(version) {
    return this.fetchById("Catalog", `CardNames-${version}`);
  }

  storeCardById(version, id, data) {
    return this.storeById(`Card-${version}`, id, data);
  }

  fetchCardById(version, id) {
    return this.fetchById(`Card-${version}`, id);
  }

  storeWorkspaceById(id, data) {
    return this.storeById("Workspace", id, data);
  }

  fetchWorkspaceById(id) {
    return this.fetchById("Workspace", id);
  }

  fetchAllWorkspaceIds() {
    let workspaceIds = [];
    return forALlRecords()
      .iterate((value, key) => {
        const matchedKey = key.match(/^Workspace:([^:]+)$/);
        if (matchedKey) {
          workspaceIds = [...workspaceIds, matchedKey[1]];
        }
      })
      .then(() => {
        return workspaceIds;
      });
  }

  deleteWorkspaceById(id) {
    return this.deleteById("Workspace", id);
  }

  storeById(modelName, id, data) {
    return getRecord(modelName, id).setAttr("data", JSON.stringify(data));
  }

  fetchById(modelName, id) {
    const record = getRecord(modelName, id);
    return record.exists().then(recordExists => {
      if (recordExists) {
        return record.getAttr("data").then(data => JSON.parse(`${data}`));
      } else {
        throw new Error(`Unable to find ${modelName} with ID: ${id}`);
      }
    });
  }

  deleteById(modelName, id) {
    const record = getRecord(modelName, id);
    return record.exists().then(recordExists => {
      if (recordExists) {
        return record.deleteRecord();
      }
    });
  }
}

let LocalForgeClientInstance = null;

export const getLocalForgeClient = () => {
  if (LocalForgeClientInstance === null) {
    LocalForgeClientInstance = new LocalForgeClient();
  }
  return LocalForgeClientInstance;
};
