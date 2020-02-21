import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import filter from "lodash/fp/filter";
import flattenDeep from "lodash/fp/flattenDeep";
import compact from "lodash/fp/compact";
import first from "lodash/fp/first";

const getName = get("name");
const getLayout = get("layout");
const getTypeLine = get("type_line");
const getColorIdentity = get("color_identity");

const getManaCost = flow([
  cardData =>
    map(getter => getter(cardData))([
      get("mana_cost"),
      flow([
        get("card_faces"),
        filter({ object: "card_face" }),
        map(get("mana_cost"))
      ])
    ]),
  flattenDeep,
  compact,
  first
]);

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
  colorIdentity: getColorIdentity(cardData),
  manaCost: getManaCost(cardData),
  typeLine: getTypeLine(cardData),
  imageUrls: getImageUrls(cardData)
});
