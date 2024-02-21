import React, { ReactNode, useState } from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import AppIntroSlider from "react-native-app-intro-slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../styles/Color";
import SalahImage from "../../components/onboarding/SalahImage";
import AbdesImage from "../../components/onboarding/AbdesImage";
import QiblaImage from "../../components/onboarding/QiblaImage";
import SalahVideoImage from "../../components/onboarding/SalahVideoImage";
import DuaImage from "../../components/onboarding/DuaImage";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../services/translation";

type SlideItemProps = {
  key: number;
  title?: string;
  text?: string;
  image: ReactNode;
};

const OnBoardingScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const ref = React.useRef<AppIntroSlider<SlideItemProps>>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation<any>();

  const slides: SlideItemProps[] = [
    {
      key: 1,
      title: i18n.t('prayer-times'),
      text: i18n.t('prayer-times-desc'),
      image: <SalahImage />,
    },
    {
      key: 2,
      title: i18n.t('ablution'),
      text: i18n.t('ablution-desc'),
      image: <AbdesImage />,
    },
    {
      key: 3,
      title: i18n.t('qibla'),
      text: i18n.t('qibla-desc'),
      image: <QiblaImage />,
    },
    {
      key: 4,
      title: i18n.t('the-prayer'),
      text: i18n.t('the-prayer-desc'),
      image: <SalahVideoImage />,
    },
    {
      key: 5,
      title: i18n.t("the-dhikr-and-du'a-in-prayers"),
      text: i18n.t("the-dhikr-and-du'a-in-prayers-desc"),
      image: <DuaImage />,
    },
  ];

  const _renderItem = (props: { item: SlideItemProps }) => {
    const { item } = props;

    return (
      <ViewBox
        mt="40"
        paddingHorizontal="37"
        justifyContent="center"
        alignItems="center"
        flex={1}
        style={{ marginBottom: 200 }}
      >
        {item.image}
        <TextBox variant="2xlBold" color="blackRussian" mt="20">
          {item.title}
        </TextBox>
        <TextBox variant="lg" color="blackRussian" mt="8" textAlign="center">
          {item.text}
        </TextBox>
      </ViewBox>
    );
  };
  const handleContinuePress = () => navigation?.navigate("Location");

  const renderNextButton = (lastSlide?: boolean) => {
    return (
      <>
        <ViewBox
          width="100%"
          height={70}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            onPress={() => {
              if (lastSlide) {
                handleContinuePress();
                return;
              }
              ref.current?.goToSlide(activeSlide + 1);
              setActiveSlide((prevSlide) => prevSlide + 1);
            }}
            text={i18n.t('continue')}
            width={180}
          />
        </ViewBox>
        {lastSlide && <ViewBox height={60} />}
      </>
    );
  };

  const renderSkipButton = () => {
    return (
      <ViewBox
        width="100%"
        alignItems="center"
        justifyContent="center"
        height={60}
      >
        <Pressable onPress={handleContinuePress}>
          <TextBox variant="md" color="green" textDecorationLine="underline">
            {i18n.t('skip')}
          </TextBox>
        </Pressable>
      </ViewBox>
    );
  };

  return (
    <ViewBox
      bg="twilightBlue"
      flex={1}
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <AppIntroSlider
        scrollEnabled={true}
        renderItem={_renderItem}
        data={slides}
        // onDone={onDone}
        ref={ref}
        onSlideChange={(key) => setActiveSlide(key)}
        style={{ backgroundColor: "transparent", flex: 1 }}
        bottomButton
        showSkipButton
        dotStyle={styles.sliderDotStyle}
        activeDotStyle={styles.sliderActiveDotStyle}
        renderNextButton={renderNextButton}
        renderDoneButton={() => renderNextButton(true)}
        renderSkipButton={renderSkipButton}
      />
    </ViewBox>
  );
};

const styles = StyleSheet.create({
  greenCircle: {
    backgroundColor: Colors.lightGreen,
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
  },
  itemTitle: {
    color: "#6D9454",
    textAlign: "center",
  },
  itemText: {
    textAlign: "center",
  },
  finishButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderDotStyle: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: Colors.grey,
  },
  sliderActiveDotStyle: {
    height: 10,
    borderRadius: 5,
    width: 10,
    backgroundColor: Colors.green,
  },
});
export default OnBoardingScreen;
