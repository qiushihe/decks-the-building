export const getRandomId = (len, radix) => {
  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  const chars = alphabet.split("");

  const newId = [];

  radix = radix || chars.length;
  len = len || 22;

  let i = 0;
  for (i = 0; i < len; i++) {
    newId[i] = chars[0 | (Math.random() * radix)];
  }

  return newId.join("");
};

export const getPrefixedRandomId = prefix => (len, radix) =>
  `${prefix}-${getRandomId(len, radix)}`;
