import React from "react";

import {
  EditOutlined,
  AddCircleOutlineRounded,
  PostAddRounded,
  LayersOutlined,
  SaveOutlined,
  FilterDramaOutlined,
  FlipToFrontOutlined,
  FullscreenRounded,
  FullscreenExitRounded,
  DoubleArrow,
  TableChartRounded,
  ViewCarouselRounded,
  ViewListRounded,
  DeleteRounded,
  ExposurePlus1Rounded,
  ExposureNeg1Rounded,
  Rotate90DegreesCcwRounded
} from "@material-ui/icons";

const makeIconHoc = IconComponent => ({ size = 24, ...restProps }) => (
  <IconComponent {...restProps} style={{ fontSize: size }} />
);

export const WorkspaceIcon = makeIconHoc(TableChartRounded);
export const LaneIcon = makeIconHoc(ViewCarouselRounded);
export const StackIcon = makeIconHoc(ViewListRounded);

export const RenameIcon = makeIconHoc(EditOutlined);
export const DeleteIcon = makeIconHoc(DeleteRounded);
export const CreateIcon = makeIconHoc(AddCircleOutlineRounded);

export const AddCardsIcon = makeIconHoc(PostAddRounded);
export const CombineCardsIcon = makeIconHoc(LayersOutlined);

export const SaveIcon = makeIconHoc(SaveOutlined);
export const ImportExportIcon = makeIconHoc(FilterDramaOutlined);

export const AddOneIcon = makeIconHoc(ExposurePlus1Rounded);
export const SubtractOneIcon = makeIconHoc(ExposureNeg1Rounded);
export const DuplicateIcon = makeIconHoc(FlipToFrontOutlined);
export const AlternateImageIcon = makeIconHoc(Rotate90DegreesCcwRounded);
export const ExpandIcon = makeIconHoc(FullscreenRounded);
export const CollapseIcon = makeIconHoc(FullscreenExitRounded);

export const DoubleArrowIcon = makeIconHoc(DoubleArrow);
