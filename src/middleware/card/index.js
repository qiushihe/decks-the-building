import seedDemoCards from "./seed-demo-cards.middleware";
import fetchCardDetail from "./fetch-card-detail.middleware";
import cacheCardDetail from "./cache-card-detail.middleware";
import persistCardDetail from "./persist-card-detail.middleware";

export default [
  seedDemoCards,
  fetchCardDetail,
  cacheCardDetail,
  persistCardDetail
];
