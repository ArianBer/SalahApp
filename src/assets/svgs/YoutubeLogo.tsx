import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const YoutubeLogo = (props: SvgProps) => (
  <Svg width={22} height={16} fill="none" {...props}>
    <Path
      fill="#E01F1F"
      d="M21.54 2.503c-.253-.985-.998-1.761-1.945-2.024C17.88 0 11 0 11 0S4.12 0 2.405.479C1.458.742.713 1.518.46 2.503 0 4.29 0 8.016 0 8.016s0 3.727.46 5.513a2.77 2.77 0 0 0 1.945 1.992C4.12 16 11 16 11 16s6.88 0 8.595-.479a2.77 2.77 0 0 0 1.945-1.992c.46-1.786.46-5.513.46-5.513s0-3.726-.46-5.513ZM8.75 11.4V4.633l5.75 3.383L8.75 11.4Z"
    />
  </Svg>
);
export default YoutubeLogo;
