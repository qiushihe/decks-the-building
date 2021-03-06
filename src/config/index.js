export const SCRYFALL_API_ORIGIN =
  process.env.SCRYFALL_API_ORIGIN || "https://api.scryfall.com";

// Use `new Date().getTime()` to generate these value
export const CARD_SYMBOLS_CACHE_VERSION = 1581979105335;
export const CARD_NAMES_CACHE_VERSION = 1581979105335;
export const CARD_DETAIL_CACHE_VERSION = 1582176953844;
export const CARD_FETCH_FAILED_IDS_VERSION = 1582176953844;

const daysInMilliseconds = days => 1000 * 60 * 60 * 24 * days;
export const CARD_SYMBOLS_CACHE_TIMEOUT = daysInMilliseconds(90);
export const CARD_NAMES_CACHE_TIMEOUT = daysInMilliseconds(3);
export const CARD_DETAIL_CACHE_TIMEOUT = daysInMilliseconds(30);

export const STACK_CONTENT_SPACING = 10;
export const STACK_CARDS_SPACING = 2;

export const CARD_DEFAULT_SCALE = 4;
export const CARD_ASPECT_RATIO = 1 + 11 / 28;
export const CARD_HEIGHT = 95;
export const CARD_WIDTH = CARD_HEIGHT / CARD_ASPECT_RATIO;

// The following are expressed as the desired value
// over the effective height of the card
export const CARD_MENU_ICON_SIZE_FACTOR = 5 / 77;
export const CARD_COLLAPSED_HEIGHT_SHRINK_FACTOR = 8 / 95;
