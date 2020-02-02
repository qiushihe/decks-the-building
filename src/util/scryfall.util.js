import get from "lodash/fp/get";

const getName = get("name");
const getManaCost = get("mana_cost");
const getConvertedManaCost = get("cmc");
const getTypeLine = get("type_line");
const getOracleText = get("oracle_text");
const getFlavorText = get("flavor_text");
const getImageUrl = get("image_uris.large");

export const normalizeCardDetail = cardData => ({
  name: getName(cardData),
  manaCost: getManaCost(cardData),
  convertedManaCost: getConvertedManaCost(cardData),
  typeLine: getTypeLine(cardData),
  oracleText: getOracleText(cardData),
  flavorText: getFlavorText(cardData),
  imageUrl: getImageUrl(cardData)
});
