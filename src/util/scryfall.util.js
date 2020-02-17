import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import filter from "lodash/fp/filter";
import flattenDeep from "lodash/fp/flattenDeep";
import compact from "lodash/fp/compact";

const getName = get("name");
const getLayout = get("layout");
const getManaCost = get("mana_cost");
const getConvertedManaCost = get("cmc");
const getTypeLine = get("type_line");
const getOracleText = get("oracle_text");
const getFlavorText = get("flavor_text");
const getImageUrls = flow([
  cardData =>
    map(getter => getter(cardData))([
      get("image_uris.normal"),
      flow([
        get("card_faces"),
        filter({ object: "card_face" }),
        map(get("image_uris.normal"))
      ])
    ]),
  flattenDeep,
  compact
]);

export const normalizeCardDetail = cardData => ({
  name: getName(cardData),
  layout: getLayout(cardData),
  manaCost: getManaCost(cardData),
  convertedManaCost: getConvertedManaCost(cardData),
  typeLine: getTypeLine(cardData),
  oracleText: getOracleText(cardData),
  flavorText: getFlavorText(cardData),
  imageUrls: getImageUrls(cardData)
});
