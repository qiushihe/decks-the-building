import { css } from "styled-components";
import reduce from "lodash/fp/reduce";

import { getRandomId } from "/src/util/random-id.util";
import { styleClassName } from "/src/util/classname.util";

let classNamePrefix = null;

export const getReactTagsStyles = () => {
  if (classNamePrefix === null) {
    // Add an "a" to prevent the class name from starting with a number.
    classNamePrefix = `a${getRandomId(8, 62)}`;
  }

  const classNames = reduce(
    (result, attrName) => ({
      ...result,
      [attrName]: `${classNamePrefix}-${attrName}`
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

  const styles = css`
    ${styleClassName(classNames.root)} {
      position: relative;
      padding: 6px 0 0 6px;
      border: 1px solid #d1d1d1;
      border-radius: 1px;
      font-size: 1em;
      line-height: 1.2;
      cursor: text;

      &${styleClassName(classNames.rootFocused)} {
        border-color: #b1b1b1;
      }
    }

    ${styleClassName(classNames.selected)} {
      display: flex;
      flex-direction: column;
      max-height: 240px;
      overflow-y: auto;
    }

    ${styleClassName(classNames.search)} {
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

    ${styleClassName(classNames.suggestions)} {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      z-index: 9999;

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

        &${styleClassName(classNames.suggestionActive)} {
          background: #b7cfe0;
        }

        &${styleClassName(classNames.suggestionDisabled)} {
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

  return { classNames, styles };
};
