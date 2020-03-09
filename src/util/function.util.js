import map from "lodash/fp/map";
import pick from "lodash/fp/pick";

export const invoke = fn => fn();

export const invokeWith = (...args) => fn => fn(...args);

export const pickArray = attrs => map(pick(attrs));
