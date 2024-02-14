import * as React from "react";
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg";
import { ViewBox } from "../../styles/theme";

const MILogo = (props: SvgProps) => (
  <ViewBox
    height={38}
    width={38}
    borderRadius={"8"}
    justifyContent="center"
    alignItems="center"
    bg="twilightBlue"
  >
    <Svg width={27} height={21} fill="none" {...props}>
      <G fill="#56791D" fillRule="evenodd" clipRule="evenodd" filter="url(#a)">
        <Path d="M4.606 5.122c.411-.737 1.342-1 2.079-.588l6.925 3.873 6.925-3.873A1.528 1.528 0 0 1 22.026 7.2l-7.67 4.29c-.464.26-1.029.26-1.492 0l-7.67-4.29a1.528 1.528 0 0 1-.588-2.08ZM4.776 10.222a1.333 1.333 0 0 1 1.813-.512l1.918 1.072a1.333 1.333 0 1 1-1.301 2.326l-1.918-1.072a1.333 1.333 0 0 1-.512-1.814Zm17.667 0c.36.643.13 1.455-.512 1.814l-1.918 1.072a1.333 1.333 0 1 1-1.3-2.326L20.63 9.71a1.333 1.333 0 0 1 1.814.512ZM10.53 13.44a1.333 1.333 0 0 1 1.813-.512l1.268.708 1.267-.708a1.333 1.333 0 0 1 1.3 2.326l-1.917 1.072a1.333 1.333 0 0 1-1.3 0l-1.919-1.072a1.333 1.333 0 0 1-.512-1.814Z" />
      </G>
      <Defs></Defs>
    </Svg>
  </ViewBox>
);

export default MILogo;
