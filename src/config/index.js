export const SCRYFALL_API_ORIGIN =
  process.env.SCRYFALL_API_ORIGIN || "https://api.scryfall.com";

export const CARD_LOAD_TIMEOUT = 5000;

export const CARD_DEFAULT_SCALE = 4;
export const CARD_WIDTH = 63;
export const CARD_HEIGHT = 88;

// The following are expressed as the desired value
// over the effective height of the card
export const CARD_MENU_ICON_SIZE_FACTOR = 5 / 77;
export const CARD_COLLAPSED_HEIGHT_SHRINK_FACTOR = 17 / 154;
export const CARD_COLLAPSED_IMAGE_SHIFT_FACTOR = 3 / 176;
export const CARD_COLLAPSED_MENU_VERTICAL_OFFSET_FACTOR = 3 / 176;
export const CARD_COLLAPSED_MENU_HORIZONTAL_OFFSET_FACTOR = 1 / 30;
export const CARD_EXPANDED_MENU_VERTICAL_OFFSET_FACTOR = 1 / 30;
export const CARD_EXPANDED_MENU_HORIZONTAL_OFFSET_FACTOR = 1 / 30;

export const STACK_CONTENT_SPACING = 10;
export const STACK_CARDS_SPACING = 6;
