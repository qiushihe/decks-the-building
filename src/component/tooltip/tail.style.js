import styled from "styled-components";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import eq from "lodash/fp/eq";
import overSome from "lodash/fp/overSome";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";

const DEG = 180 / Math.PI;
const RAD = Math.PI / 180;

export const getTailParameters = ({ tailWidth }) => {
  const tailHeight = tailWidth / 2;
  const tailAngle = Math.atan(tailHeight / (tailWidth / 2)) * DEG;
  const tailSize = Math.abs(tailWidth / 2 / Math.cos(tailAngle * RAD));
  const cornerRadius = tailWidth >= 30 ? 5 : 3;

  return {
    tailWidth,
    tailHeight,
    tailSize,
    cornerRadius
  };
};

export const getTailBase = ({ tailWidth, tailHeight }) => styled.div`
  width: ${flow([
    get("region"),
    cond([
      [overSome([eq("top"), eq("bottom")]), constant(tailWidth)],
      [stubTrue, constant(tailHeight)]
    ])
  ])}px;
  height: ${flow([
    get("region"),
    cond([
      [overSome([eq("top"), eq("bottom")]), constant(tailHeight)],
      [stubTrue, constant(tailWidth)]
    ])
  ])}px;
`;

export const getPointerContainer = () => styled.div`
  position: absolute;
  top: ${flow([
    get("region"),
    cond([
      [eq("top"), constant(-1)],
      [eq("bottom"), constant(1)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  left: ${flow([
    get("region"),
    cond([
      [eq("left"), constant(-1)],
      [eq("right"), constant(1)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  right: ${flow([
    get("region"),
    cond([
      [eq("right"), constant(-1)],
      [eq("left"), constant(1)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  bottom: ${flow([
    get("region"),
    cond([
      [eq("bottom"), constant(-1)],
      [eq("top"), constant(1)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  overflow: hidden;
`;

export const getPointer = ({
  tailHeight,
  tailSize,
  cornerRadius,
  backgroundColor,
  borderColor
}) => styled.div`
  position: absolute;
  top: ${flow([
    get("region"),
    cond([
      [eq("top"), constant(-1 * tailHeight)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  left: ${flow([
    get("region"),
    cond([
      [eq("left"), constant(-1 * tailHeight)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  right: ${flow([
    get("region"),
    cond([
      [eq("right"), constant(-1 * tailHeight)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  bottom: ${flow([
    get("region"),
    cond([
      [eq("bottom"), constant(-1 * tailHeight)],
      [stubTrue, constant(0)]
    ])
  ])}px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    content: "";
    display: flex;
    position: relative;
    width: ${tailSize}px;
    height: ${tailSize}px;
    transform: rotate(45deg);
    background-color: ${backgroundColor};
    border: 1px solid ${borderColor};
    border-bottom-right-radius: ${flow([
      get("region"),
      cond([
        [eq("top"), constant(cornerRadius)],
        [stubTrue, constant(0)]
      ])
    ])}px;
    border-top-left-radius: ${flow([
      get("region"),
      cond([
        [eq("bottom"), constant(cornerRadius)],
        [stubTrue, constant(0)]
      ])
    ])}px;
    border-top-right-radius: ${flow([
      get("region"),
      cond([
        [eq("left"), constant(cornerRadius)],
        [stubTrue, constant(0)]
      ])
    ])}px;
    border-bottom-left-radius: ${flow([
      get("region"),
      cond([
        [eq("right"), constant(cornerRadius)],
        [stubTrue, constant(0)]
      ])
    ])}px;
  }
`;
