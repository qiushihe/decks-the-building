import React from "react";

import {
  FlipToFrontOutlined,
  FullscreenRounded,
  FullscreenExitRounded,
  TableChartRounded,
  ViewCarouselRounded,
  ViewListRounded,
  RemoveCircleOutlineRounded,
  ExposurePlus1Rounded,
  ExposureNeg1Rounded,
  Rotate90DegreesCcwRounded,
  MoreVertRounded
} from "@material-ui/icons";

const makeIconHoc = IconComponent => ({ size = 24, ...restProps }) => (
  <IconComponent {...restProps} style={{ fontSize: size }} />
);

export const WorkspaceIcon = makeIconHoc(TableChartRounded);
export const LaneIcon = makeIconHoc(ViewCarouselRounded);
export const StackIcon = makeIconHoc(ViewListRounded);

export const DeleteIcon = makeIconHoc(RemoveCircleOutlineRounded);

export const AddOneIcon = makeIconHoc(ExposurePlus1Rounded);
export const SubtractOneIcon = makeIconHoc(ExposureNeg1Rounded);
export const DuplicateIcon = makeIconHoc(FlipToFrontOutlined);
export const AlternateImageIcon = makeIconHoc(Rotate90DegreesCcwRounded);
export const ExpandIcon = makeIconHoc(FullscreenRounded);
export const CollapseIcon = makeIconHoc(FullscreenExitRounded);

export const ThreeDotsIcon = makeIconHoc(MoreVertRounded);
