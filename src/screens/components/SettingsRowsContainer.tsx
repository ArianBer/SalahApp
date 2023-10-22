import React, { PropsWithChildren } from "react";
import { TextBox, ThemeType, ViewBox } from "../../styles/theme";
import { BoxProps } from "@shopify/restyle";

interface Props extends BoxProps<ThemeType> {
  title?: string;
}
export const SettingsRowsContainer = ({
  children,
  title,
  ...props
}: PropsWithChildren<Props>) => (
  <ViewBox {...props}>
    {!!title && (
      <TextBox ml="24" color="mainText" variant="md">
        {title}
      </TextBox>
    )}
    <ViewBox mt="8" width="100%" backgroundColor="white" borderRadius="14">
      {children}
    </ViewBox>
  </ViewBox>
);
