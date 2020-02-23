import { lighten } from "polished";
import flow from "lodash/fp/flow";
import toLower from "lodash/fp/toLower";
import trim from "lodash/fp/trim";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import map from "lodash/fp/map";
import reduce from "lodash/fp/reduce";
import isEmpty from "lodash/fp/isEmpty";
import constant from "lodash/fp/constant";
import stubTrue from "lodash/fp/stubTrue";
import identity from "lodash/fp/identity";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";
import eq from "lodash/fp/eq";
import toUpper from "lodash/fp/toUpper";
import size from "lodash/fp/size";
import isNil from "lodash/fp/isNil";
import join from "lodash/fp/join";

import CardBackgroundGold from "/src/asset/image/card-background/card-background-gold.png";
import CardBackgroundArtifact from "/src/asset/image/card-background/card-background-artifact.png";
import CardBackgroundWhite from "/src/asset/image/card-background/card-background-white.png";
import CardBackgroundRed from "/src/asset/image/card-background/card-background-red.png";
import CardBackgroundGreen from "/src/asset/image/card-background/card-background-green.png";
import CardBackgroundBlack from "/src/asset/image/card-background/card-background-black.png";
import CardBackgroundBlue from "/src/asset/image/card-background/card-background-blue.png";

import {
  COLOR_IDENTITY_NONE,
  COLOR_IDENTITY_WHITE,
  COLOR_IDENTITY_RED,
  COLOR_IDENTITY_GREEN,
  COLOR_IDENTITY_BLACK,
  COLOR_IDENTITY_BLUE
} from "/src/enum/color-identity.enum";

import { encode } from "/src/util/base64.util";

export const encodeCardName = flow([trim, toLower, encode]);

const parseColorIdentity = flow([
  cond([
    [isEmpty, constant([])],
    [
      stubTrue,
      flow([
        map(
          flow([
            toUpper,
            cond([
              [eq("W"), constant(COLOR_IDENTITY_WHITE)],
              [eq("R"), constant(COLOR_IDENTITY_RED)],
              [eq("G"), constant(COLOR_IDENTITY_GREEN)],
              [eq("B"), constant(COLOR_IDENTITY_BLACK)],
              [eq("U"), constant(COLOR_IDENTITY_BLUE)],
              [stubTrue, constant(null)]
            ])
          ])
        ),
        compact,
        uniq
      ])
    ]
  ]),
  cond([
    [isEmpty, constant([COLOR_IDENTITY_NONE])],
    [stubTrue, identity]
  ])
]);

export const colorIdentityGradientGetter = gradientSource =>
  flow([
    parseColorIdentity,
    map(
      flow([
        get,
        getter => getter(gradientSource),
        cond([
          [isNil, constant(gradientSource[COLOR_IDENTITY_NONE])],
          [stubTrue, identity]
        ])
      ])
    ),
    cond([
      [
        isEmpty,
        constant([
          gradientSource[COLOR_IDENTITY_NONE],
          lighten(0.15, gradientSource[COLOR_IDENTITY_NONE])
        ])
      ],
      [flow([size, eq(1)]), ([color]) => [color, lighten(0.15, color)]],
      [stubTrue, identity]
    ]),
    reduce(
      ({ entries, count }, color) => ({
        entries: [...entries, { color, index: count }],
        count: count + 1
      }),
      { entries: [], count: 0 }
    ),
    ({ entries, count }) =>
      map(entry => ({
        ...entry,
        count
      }))(entries),
    map(
      ({ color, index, count }) => `${color} ${(100 / (count - 1)) * index}%`
    ),
    join(", ")
  ]);

export const getCardBackground = flow([
  parseColorIdentity,
  cond([
    [isEmpty, constant([COLOR_IDENTITY_NONE])],
    [stubTrue, identity]
  ]),
  cond([
    [
      flow([size, eq(1)]),
      flow([
        get(0),
        cond([
          [eq(COLOR_IDENTITY_WHITE), constant(CardBackgroundWhite)],
          [eq(COLOR_IDENTITY_RED), constant(CardBackgroundRed)],
          [eq(COLOR_IDENTITY_GREEN), constant(CardBackgroundGreen)],
          [eq(COLOR_IDENTITY_BLACK), constant(CardBackgroundBlack)],
          [eq(COLOR_IDENTITY_BLUE), constant(CardBackgroundBlue)],
          [stubTrue, constant(CardBackgroundArtifact)]
        ])
      ])
    ],
    [stubTrue, constant(CardBackgroundGold)]
  ])
]);
