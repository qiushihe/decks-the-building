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

export const getRecord = (model, id, { storageEngine } = {}) => {
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
