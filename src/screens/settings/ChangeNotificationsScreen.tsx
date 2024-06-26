import React from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { IconArrowLeft } from "tabler-icons-react-native";
import { useNavigation } from "@react-navigation/native";

const ChangeNotificationsScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <ViewBox
      style={{ paddingTop: top }}
      flex={1}
      backgroundColor="twilightBlue"
    >
      <ViewBox height={50} alignItems="center" width="100%" flexDirection="row">
        <TouchableOpacity
          onPress={navigation.goBack}
          hitSlop={{ top: 20, bottom: 10 }}
          style={{ paddingHorizontal: 30 }}
        >
          <IconArrowLeft size={28} />
        </TouchableOpacity>
        <ViewBox flex={1} justifyContent="center" alignItems="center">
          <TextBox variant="2xl" color="mainText">
            Njoftimet
          </TextBox>
        </ViewBox>
        <ViewBox style={{ marginHorizontal: 30, width: 28 }} />
      </ViewBox>
    </ViewBox>
  );
};

export default ChangeNotificationsScreen;
