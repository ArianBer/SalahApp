import React from "react";
import { TextBox, ViewBox } from "../styles/theme";

function Settings() {
  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <TextBox color="mainText" variant="xlBold">
        Settings
      </TextBox>
    </ViewBox>
  );
}

export default Settings;
