import { css } from "styled-components";
import reduce from "lodash/fp/reduce";

import { getRandomId, getPrefixedRandomId } from "/src/util/random-id.util";
import { styleClassName } from "/src/util/classname.util";

const getReactTagsClassName = getPrefixedRandomId(getRandomId(6, 62));

export const ReactTagsClassNames = reduce(
  (result, attrName) => ({
    ...result,
    [attrName]: getReactTagsClassName(16, 62)
  }),
  {}
)([
  "root",
  "rootFocused",
  "selected",
  "selectedTag",
  "selectedTagName",
  "search",
  "searchInput",
  "suggestions",
  "suggestionActive",
  "suggestionDisabled"
]);

export const ReactTagsStyles = css`
  ${styleClassName(ReactTagsClassNames.root)} {
    position: relative;
    padding: 6px 0 0 6px;
    border: 1px solid #d1d1d1;
    border-radius: 1px;
    font-size: 1em;
    line-height: 1.2;
    cursor: text;

    &${styleClassName(ReactTagsClassNames.rootFocused)} {
      border-color: #b1b1b1;
    }
  }

  ${styleClassName(ReactTagsClassNames.selected)} {
    display: flex;
    flex-direction: column;
  }

  ${styleClassName(ReactTagsClassNames.search)} {
    display: inline-block;
    padding: 7px 2px;
    margin-bottom: 6px;
    max-width: 100%;

    input {
      max-width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      outline: none;
      font-size: inherit;
      line-height: inherit;

      &::-ms-clear {
        display: none;
      }
    }
  }

  ${styleClassName(ReactTagsClassNames.suggestions)} {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;

    ul {
      margin: 4px -1px;
      padding: 0;
      list-style: none;
      background: white;
      border: 1px solid #d1d1d1;
      border-radius: 2px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    li {
      border-bottom: 1px solid #ddd;
      padding: 6px 8px;

      &:hover {
        cursor: pointer;
        background: #eee;
      }

      &${styleClassName(ReactTagsClassNames.suggestionActive)} {
        background: #b7cfe0;
      }

      &${styleClassName(ReactTagsClassNames.suggestionDisabled)} {
        opacity: 0.5;
        cursor: auto;
      }

      mark {
        text-decoration: underline;
        background: none;
        font-weight: 600;
      }
    }
  }
`;
