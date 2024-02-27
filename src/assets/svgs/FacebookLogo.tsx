import * as React from "react";
import Svg, { SvgProps, LinearGradient, Stop, Path } from "react-native-svg";

const FacebookLogo = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      fill="#316FF6"
      d="M22 11.028C22 4.94 17.072 0 11 0S0 4.94 0 11.028a11.03 11.03 0 0 0 8.8 10.807v-7.5H6.6v-3.307h2.2V8.27a3.86 3.86 0 0 1 3.85-3.86h2.75v3.308h-2.2c-.605 0-1.1.497-1.1 1.103v2.206h3.3v3.308h-3.3V22c5.555-.551 9.9-5.25 9.9-10.972Z"
    />
  </Svg>
);
export default FacebookLogo;
