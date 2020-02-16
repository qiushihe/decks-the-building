import React from "react";

import {
  DashboardRounded,
  VerticalSplitRounded,
  HorizontalSplitRounded,
  EditOutlined,
  HighlightOffRounded,
  AddCircleOutlineRounded,
  PostAddRounded,
  LayersOutlined,
  SaveOutlined,
  FilterDramaOutlined,
  AddRounded,
  RemoveRounded,
  FlipToFrontOutlined,
  FullscreenRounded,
  FullscreenExitRounded,
  DoubleArrow
} from "@material-ui/icons";

const makeIconHoc = IconComponent => ({ size = 24, ...restProps }) => (
  <IconComponent {...restProps} style={{ fontSize: size }} />
);

export const WorkspaceIcon = makeIconHoc(DashboardRounded);
export const LaneIcon = makeIconHoc(VerticalSplitRounded);
export const StackIcon = makeIconHoc(HorizontalSplitRounded);

export const RenameIcon = makeIconHoc(EditOutlined);
export const DeleteIcon = makeIconHoc(HighlightOffRounded);
export const CreateIcon = makeIconHoc(AddCircleOutlineRounded);

export const AddCardsIcon = makeIconHoc(PostAddRounded);
export const CombineCardsIcon = makeIconHoc(LayersOutlined);

export const SaveIcon = makeIconHoc(SaveOutlined);
export const ImportExportIcon = makeIconHoc(FilterDramaOutlined);

export const AddOneIcon = makeIconHoc(AddRounded);
export const SubtractOneIcon = makeIconHoc(RemoveRounded);
export const DuplicateIcon = makeIconHoc(FlipToFrontOutlined);
export const ExpandIcon = makeIconHoc(FullscreenRounded);
export const CollapseIcon = makeIconHoc(FullscreenExitRounded);

export const DoubleArrowIcon = makeIconHoc(DoubleArrow);
