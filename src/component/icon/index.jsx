import React from "react";

import {
  Edit,
  AddCircleOutlineRounded,
  PostAddRounded,
  LayersOutlined,
  SaveOutlined,
  FilterDramaOutlined,
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

export const RenameIcon = makeIconHoc(Edit);
export const DeleteIcon = makeIconHoc(RemoveCircleOutlineRounded);
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

export const ThreeDotsIcon = makeIconHoc(MoreVertRounded);
