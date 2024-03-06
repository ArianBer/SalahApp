import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const FacebookLargeIcon = (props: SvgProps) => (
  <Svg width={36} height={35} fill="none" {...props}>
    <Path
      fill="#56791D"
      d="M18.337 0C8.673 0 .837 7.864.837 17.564c0 8.237 5.651 15.15 13.273 17.047v-11.68h-3.608v-5.367h3.608v-2.313c0-5.978 2.696-8.749 8.544-8.749 1.108 0 3.021.219 3.804.437v4.865c-.413-.044-1.13-.065-2.021-.065-2.87 0-3.979 1.09-3.979 3.927v1.898h5.717l-.983 5.368H20.46V35c8.665-1.05 15.379-8.455 15.379-17.436 0-9.7-7.836-17.564-17.5-17.564Z"
    />
  </Svg>
);

export default FacebookLargeIcon;
