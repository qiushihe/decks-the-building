import restoreCardDetail from "./restore-card-detail.middleware";
import restoreCardNames from "./restore-card-names.middleware";
import restoreCardSymbols from "./restore-card-symbols.middleware";
import saveFailedCardIds from "./save-failed-card-ids.middleware";
import restoreFailedCardIds from "./restore-failed-card-ids.middleware";

export default [
  restoreCardDetail,
  restoreCardNames,
  restoreCardSymbols,
  saveFailedCardIds,
  restoreFailedCardIds
];
