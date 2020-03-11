import { getContentBase } from "./content.style";

import {
  getTailParameters,
  getTailBase,
  getPointerContainer,
  getPointer
} from "./tail.style";

export const ContentBase = getContentBase({
  fontSize: 16,
  color: "#000000",
  backgroundColor: "#ffffff",
  borderColor: "#aaaaaa"
});

const { tailWidth, tailHeight, tailSize, cornerRadius } = getTailParameters({
  tailWidth: 20
});

export const TailBase = getTailBase({ tailWidth, tailHeight });

export const PointerContainer = getPointerContainer();

export const Pointer = getPointer({
  tailHeight,
  tailSize,
  cornerRadius,
  backgroundColor: "#ffffff",
  borderColor: "#aaaaaa"
});

export default {
  ContentBase,
  TailBase,
  PointerContainer,
  Pointer
};
