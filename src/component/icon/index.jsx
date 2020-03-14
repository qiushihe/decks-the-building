import React from "react";

import {
  FlipToFrontOutlined,
  FullscreenRounded,
  FullscreenExitRounded,
  TableChartRounded,
  ViewCarouselRounded,
  ViewListRounded,
  ExposurePlus1Rounded,
  ExposureNeg1Rounded,
  Rotate90DegreesCcwRounded,
  MoreVertRounded,
  ErrorRounded,
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded
} from "@material-ui/icons";

const makeIconHoc = IconComponent => ({ size = 24, ...restProps }) => (
  <IconComponent {...restProps} style={{ fontSize: size }} />
);

export const WorkspaceIcon = makeIconHoc(TableChartRounded);
export const LaneIcon = makeIconHoc(ViewCarouselRounded);
export const StackIcon = makeIconHoc(ViewListRounded);

export const AddOneIcon = makeIconHoc(ExposurePlus1Rounded);
export const SubtractOneIcon = makeIconHoc(ExposureNeg1Rounded);
export const DuplicateIcon = makeIconHoc(FlipToFrontOutlined);
export const AlternateImageIcon = makeIconHoc(Rotate90DegreesCcwRounded);
export const ExpandIcon = makeIconHoc(FullscreenRounded);
export const CollapseIcon = makeIconHoc(FullscreenExitRounded);

export const ThreeDotsIcon = makeIconHoc(MoreVertRounded);
export const ErrorIcon = makeIconHoc(ErrorRounded);

export const AddIcon = makeIconHoc(AddCircleOutlineRounded);
export const RemoveIcon = makeIconHoc(RemoveCircleOutlineRounded);
