import React from "react";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import eq from "lodash/fp/eq";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";
import omit from "lodash/fp/omit";

import { TOOLTIP } from "/src/enum/global-z-index.enum";

export const getContentBase = ({
  fontSize,
  color,
  backgroundColor,
  borderColor
}) => styled(props => {
  const componentProps = omit(["padded"])(props);
  return <div {...componentProps} />;
})`
  padding: ${flow([
    get("padded"),
    cond([
      [eq(true), constant(10)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  font-size: ${fontSize}px;
  color: ${color};
  background-color: ${backgroundColor};
  border: 1px solid ${borderColor};
  box-shadow: 10px 6px 14px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: ${TOOLTIP};
`;
