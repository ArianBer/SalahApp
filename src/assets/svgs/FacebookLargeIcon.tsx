import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const FacebookLargeIcon = (props: SvgProps) => (
  <Svg width={41} height={40} fill="none" {...props}>
    <Path
      fill="#56791D"
      d="M20.448 0C9.618 0 .838 8.812.838 19.682c0 9.23 6.331 16.975 14.873 19.103V25.697h-4.044v-6.015h4.044V17.09c0-6.699 3.02-9.804 9.573-9.804 1.242 0 3.386.245 4.263.49v5.451c-.463-.049-1.267-.073-2.265-.073-3.215 0-4.458 1.223-4.458 4.4v2.128h6.405l-1.1 6.015h-5.305V39.22c9.71-1.177 17.234-9.475 17.234-19.538C40.058 8.812 31.278 0 20.448 0Z"
    />
  </Svg>
);

export default FacebookLargeIcon;
