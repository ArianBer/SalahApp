import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const LocationIcon = (props: SvgProps) => (
  <Svg width={14} height={20} fill="none" {...props}>
    <Path
      fill="#56791D"
      d="M7 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM7 0a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
    />
  </Svg>
);
export default LocationIcon;
