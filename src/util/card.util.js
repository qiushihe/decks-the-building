import flow from "lodash/fp/flow";
import toLower from "lodash/fp/toLower";
import trim from "lodash/fp/trim";

import { encode } from "/src/util/base64.util";

export const encodeCardName = flow([trim, toLower, encode]);
