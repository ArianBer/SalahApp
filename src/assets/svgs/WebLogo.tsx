import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const WebLogo = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#56791D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 15 6-6m-4-3 .463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5-.397.534a5.068 5.068 0 0 1-7.127 0 4.972 4.972 0 0 1 0-7.071L6 11"
    />
  </Svg>
);

export default WebLogo;
