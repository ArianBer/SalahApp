import React from "react";
import { TextBox, ViewBox } from "../styles/theme";

function Home() {
  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <TextBox variant="lg" margin="md">
        Home Screen
      </TextBox>
    </ViewBox>
  );
}

export default Home;
