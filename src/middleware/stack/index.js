import createDefaultStack from "./create-default-stack.middleware";
import seedDemoCardIds from "./seed-demo-card-ids.middleware";

export default [createDefaultStack, seedDemoCardIds];
