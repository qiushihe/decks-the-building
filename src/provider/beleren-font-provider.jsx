import React from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";

import Beleren2016BoldWoff2 from "/src/asset/font/beleren-bold/Beleren2016-Bold.woff2";
import Beleren2016BoldWoff from "/src/asset/font/beleren-bold/Beleren2016-Bold.woff";
import Beleren2016BoldTff from "/src/asset/font/beleren-bold/Beleren2016-Bold.ttf";
import Beleren2016BoldSvg from "/src/asset/font/beleren-bold/Beleren2016-Bold.svg";

import Beleren2016SmallCapBoldWoff2 from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-Bold.woff2";
import Beleren2016SmallCapBoldWoff from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-Bold.woff";
import Beleren2016SmallCapBoldTtf from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-Bold.ttf";
import Beleren2016SmallCapBoldSvg from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-Bold.svg";

import Beleren2016SmallCapBoldItalicWoff2 from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-BoldItalic.woff2";
import Beleren2016SmallCapBoldItalicWoff from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-BoldItalic.woff";
import Beleren2016SmallCapBoldItalicTtf from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-BoldItalic.ttf";
import Beleren2016SmallCapBoldItalicSvg from "/src/asset/font/beleren-bold/Beleren2016SmallCaps-BoldItalic.svg";

const BelerenFontStyle = createGlobalStyle`
  @font-face {
    font-family: "Beleren Bold";
    src: url(${Beleren2016BoldWoff2}) format("woff2"),
      url(${Beleren2016BoldWoff}) format("woff"),
      url(${Beleren2016BoldTff}) format("truetype"),
      url(${Beleren2016BoldSvg}) format("svg");
    font-style: normal;
    font-weight: bold;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: "Beleren SmallCaps Bold";
    src: url(${Beleren2016SmallCapBoldWoff2}) format("woff2"),
      url(${Beleren2016SmallCapBoldWoff}) format("woff"),
      url(${Beleren2016SmallCapBoldTtf}) format("truetype"),
      url(${Beleren2016SmallCapBoldSvg}) format("svg");
    font-style: normal;
    font-weight: bold;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: "Beleren SmallCaps BoldItalic";
    src: url(${Beleren2016SmallCapBoldItalicWoff2}) format("woff2"),
      url(${Beleren2016SmallCapBoldItalicWoff}) format("woff"),
      url(${Beleren2016SmallCapBoldItalicTtf}) format("truetype"),
      url(${Beleren2016SmallCapBoldItalicSvg}) format("svg");
    font-style: italic;
    font-weight: bold;
    text-rendering: optimizeLegibility;
  }
`;

export class BelerenFontProvider extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <BelerenFontStyle />
        {children}
      </React.Fragment>
    );
  }
}

BelerenFontProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

BelerenFontProvider.defaultProps = {
  children: null
};

export default BelerenFontProvider;
