import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconPlayerPlay } from "tabler-icons-react-native";
import { TextBox, ViewBox } from "../../styles/theme";

interface Props {
  title: string;
  sound: string;
  transliteration: string;
}

export function PlayableItem({ sound, title, transliteration }: Props) {
  const isPlaying = false;

  return (
    <ViewBox mt="xxxxxl" width="100%">
      <TextBox color="mainText" variant="md-bold">
        {title}
      </TextBox>
      <ViewBox mt="xxxl" width="100%" flexDirection="row" alignItems="center">
        <TouchableOpacity>
          <ViewBox
            height={46}
            width={46}
            borderRadius={23}
            backgroundColor="lightGreen"
            justifyContent="center"
            alignItems="center"
          >
            <IconPlayerPlay fill="black" radius={20} />
          </ViewBox>
        </TouchableOpacity>

        <TextBox ml="xxl" variant="lg" color="mainText">
          2:02/4:32
        </TextBox>

        <ViewBox flex={1} ml="xl" flexDirection="row" alignItems="center">
          <ViewBox
            position="absolute"
            height={14}
            width={14}
            left="30%"
            zIndex={1}
            borderRadius={12}
            backgroundColor="darkGreen"
          />
          <ViewBox
            width="30%"
            height={2}
            borderRadius={20}
            backgroundColor="darkGreen"
          />
          <ViewBox
            width="70%"
            height={2}
            borderRadius={20}
            backgroundColor="grey"
          />
        </ViewBox>
      </ViewBox>
      <TextBox mt="xxxl" variant="lg">
        {transliteration}
      </TextBox>
    </ViewBox>
  );
}
