import React, { ReactNode, useState } from "react";
import { TextBox, ViewBox } from "../../styles/theme";
import AppIntroSlider from "react-native-app-intro-slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../styles/Color";
import SalahImage from "../../components/onboarding/SalahImage";
import AbdesImage from "../../components/onboarding/AbdesImage";
import QiblaImage from "../../components/onboarding/QiblaImage";
import SalahVideoImage from "../../components/onboarding/SalahVideoImage";
import DuaImage from "../../components/onboarding/DuaImage";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

type SlideItemProps = {
  key: number;
  title?: string;
  text?: string;
  image: ReactNode;
};

const slides: SlideItemProps[] = [
  {
    key: 1,
    title: "Kohët e namazit",
    text: `Është pyetur i Dërguari i Allahut, ﷺ, se cila vepër është më e dashur tek Allahu? Ai është përgjigjur duke thënë: “Namazi në kohën e vet...”`,
    image: <SalahImage />,
  },
  {
    key: 2,
    title: "Abdesi",
    text: "Brenda aplikacionit do gjeni formën profetike të të pastruarit para faljes së namazit.",
    image: <AbdesImage />,
  },
  {
    key: 3,
    title: "Kibla",
    text: `Para se ta fillojmë çdo namaz, fytyrat tona duhet të jenë të drejtuara drejt qabesë ashtu siç na urdhëroi Allahu: ..."kudo që të jeni (o besimtarë) kthehuni kah ajo anë (Qabeja)".`,
    image: <QiblaImage />,
  },
  {
    key: 4,
    title: "Namazi",
    text: `Me video-ilustrime brenda aplikacionit do mësoni hap pas hapi formën e faljes së çdo namazi. Nga ai i sabahut e deri tek ai i jacisë.`,
    image: <SalahVideoImage />,
  },
  {
    key: 5,
    title: "Lutjet brenda namazit",
    text: `Se çka duhet të thuhet brenda e jashtë namazit do i mësoni me lejën e Allahut në kategorinë përkatëse brenda aplikacionit.`,
    image: <DuaImage />,
  },
];

const OnBoardingScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const ref = React.useRef<AppIntroSlider<SlideItemProps>>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation<any>();

  const _renderItem = (props: { item: SlideItemProps }) => {
    const { item } = props;

    return (
      <ViewBox
        paddingHorizontal="37"
        paddingTop="20"
        justifyContent="center"
        alignItems="center"
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
      <ViewBox width="100%" mt="20" justifyContent="center" alignItems="center">
        <Button
          onPress={() => {
            if (lastSlide) {
              handleContinuePress();
              return;
            }
            ref.current?.goToSlide(activeSlide + 1);
            setActiveSlide((prevSlide) => prevSlide + 1);
          }}
          text="Vazho"
          width={180}
        />
      </ViewBox>
    );
  };

  const renderSkipButton = () => {
    return (
      <ViewBox width="100%" alignItems="center" mt="20">
        <Pressable onPress={handleContinuePress}>
          <TextBox variant="md" color="green" textDecorationLine="underline">
            Skip
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
