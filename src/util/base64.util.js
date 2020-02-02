import { Base64 } from "js-base64";

export const encode = payload => Base64.encode(payload);

export const decode = payload => Base64.decode(payload);
