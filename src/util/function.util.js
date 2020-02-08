export const invoke = fn => fn();

export const invokeWith = (...args) => fn => fn(...args);
