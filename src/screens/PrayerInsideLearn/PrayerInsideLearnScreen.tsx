import { Audio } from "expo-av";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconArrowLeft } from "tabler-icons-react-native";
import FullScreenLoader from "../../components/FullScreenLoader";
import { DuaType } from "../../data/duate";
import { TextBox, ViewBox } from "../../styles/theme";
import { PlayableItem } from "./PlayableItem";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

export function PrayerInsideLearnScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);
  const [currentSound, setCurrentSound] = useState<null | number>(null);
  const [soundsData, setSoundsData] = useState<Audio.Sound[]>([]);
  const [soundsLoading, setSoundsLoading] = useState(true);
  const attemptCount = useRef(0); // useRef to store attempt count
  const { t } = useTranslation();
  const language = useAppSelector(
    (state) => state.language.languageSelected.value
  );

  const duate: DuaType[] = useMemo(
    () => [
      {
        title: t("initial-takbir"),
        sound: require("../../assets/sounds/1-tekbiri.mp3"),
        reading: t("allahu-akbar"),
        translation: t("allah-is-greatest"),
      },
      {
        title: t("dua-after-first-takbir"),
        reading: t("first-dua-reading"),
        sound: require("../../assets/sounds/2-pas-tekbirit.mp3"),
        translation: t("first-dua"),
      },
      {
        title: t("protection-from-god-title"),
        reading: t("protection-from-god"),
        sound: require("../../assets/sounds/3-istiadheja.mp3"),
        translation: t("protection-from-god-translation"),
      },
      {
        title: t("bismilah-title"),
        reading: t("bismilah"),
        sound: require("../../assets/sounds/4-besmeleja.mp3"),
        translation: t("bismilah-translate"),
      },
      {
        title: t("surah-alfatiha"),
        reading: `1. Bismilahi rrahmani er-rahimi\n2. El-hamdu lillahi rabbil-'alemine\n3. Er-rahmani er-rahimi\n4. Maliki jewmi ed-dini\n5. ijake na'budu we 'ijake nesta'inu\n6. Ihdina es-siratel-mustekime\n7. Siratel-ledhine 'en'amte 'alejhim gajril-megdubi 'alejhim we la ed-dalline.`,
        sound: require("../../assets/sounds/5-fatiha.mp3"),
        translation: t("surah-alfatiha-translate"),
      },
      {
        title: t("surah-ikhlas"),
        reading: `1.Kul huwal-lahu 'ehad\n2. Allahu s-samed\n3. Lem jelid we lem juled\n4. Welem jekun lehu kufuen 'ehadun.`,
        translation: t("surah-ikhlas-translate"),
        sound: require("../../assets/sounds/6-surja-ihlas.mp3"),
      },
      {
        title: t("dua-ruku"),
        reading: t("dua-ruku-ar"),
        sound: require("../../assets/sounds/7-lutja-ruku.mp3"),
        translation: t("dua-ruku-translate"),
      },
      {
        title: t("dua-after-ruku"),
        reading: t("dua-after-ruku-ar"),
        sound: require("../../assets/sounds/8-lutja-ruku-duke-u-ngritur.mp3"),
        translation: t("dua-after-ruku-translate"),
      },
      {
        title: t("dua-after-s"),
        reading: t("dua-after-s-ar"),
        sound: require("../../assets/sounds/9-lutja-ruku-pasi-ngrihemi.mp3"),
        translation: t("dua-after-s-translate"),
      },
      {
        title: t("dua-sajdah"),
        reading: t("dua-sajdah-ar"),
        sound: require("../../assets/sounds/10-lutja-sexhde.mp3"),
        translation: t("dua-sajdah-translate"),
      },
      {
        title: t("dua-between-sajdah"),
        reading: t("dua-between-sajdah-ar"),
        sound: require("../../assets/sounds/11-lutja-mes-dy-sexhdeve.mp3"),
        translation: t("dua-between-sajdah-translate"),
      },
      {
        title: t("tehijat"),
        reading: t("tehijat-ar"),
        translation: t("tehijat-translate"),
        sound: require("../../assets/sounds/12-tehijati.mp3"),
      },
      {
        title: t("salavat"),
        reading: t("salavat-ar"),
        translation: t("salavat-translate"),
        sound: require("../../assets/sounds/13-salavatet.mp3"),
      },
      {
        title: t("dua-before-selam"),
        reading: t("dua-before-selam-ar"),
        translation: t("dua-before-selam-translate"),
        sound: require("../../assets/sounds/14-duaja-para-selamit.mp3"),
      },
      {
        title: t("selam"),
        reading: t("selam-ar"),
        translation: t("selam-translate"),
        sound: require("../../assets/sounds/15-selami.mp3"),
      },
      {
        title: t("dua-after-prayer"),
        reading: t("dua-after-prayer-ar"),
        translation: t("dua-after-prayer-translate"),
        sound: require("../../assets/sounds/16-dhikri-pas-selamit.mp3"),
      },
    ],
    [t]
  );

  const loadSoundsData = async () => {
    try {
      setSoundsLoading(true);
      const data: Audio.Sound[] = await Promise.all(
        duate.map(async (x) => {
          const soundObj = await Audio.Sound.createAsync(x.sound);

          return soundObj.sound;
        })
      );
      setSoundsData(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSoundsLoading(false);
    }
  };

  const loadSoundWithRetry = async () => {
    while (attemptCount.current < 2) {
      try {
        attemptCount.current++;
        return await Promise.race([
          loadSoundsData(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 6000)
          ),
        ]);
      } catch (error) {
        console.log(`Attempt ${attemptCount.current} failed:`, error);
      }
    }
  };

  useEffect(() => {
    return () => {
      soundsData.forEach((sound) => sound.unloadAsync());
    };
  }, [soundsData]);

  useEffect(() => {
    loadSoundWithRetry();
  }, [language]);

  const onPressBack = () => navigation?.goBack();

  const onPressPlay = (index: number) => {
    setCurrentSound(index);
    listRef.current?.scrollToIndex({ index, animated: true });
  };

  const keyExtractor = useCallback(
    (item: DuaType, index: number) => item.title + index,
    []
  );

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: DuaType }) => {
      return (
        <PlayableItem
          isAnotherSoundPlaying={
            currentSound !== null && currentSound !== index
          }
          onPressPlay={() => onPressPlay(index)}
          sound={soundsData[index]}
          title={item.title}
          transliteration={item.reading}
          translation={item.translation}
        />
      );
    },
    [currentSound, soundsData]
  );

  return (
    <ViewBox style={{ paddingTop: top }} flex={1}>
      <ViewBox height={50} alignItems="center" width="100%" flexDirection="row">
        <TouchableOpacity
          onPress={onPressBack}
          hitSlop={{ top: 20, bottom: 10 }}
          style={{ paddingHorizontal: 30 }}
        >
          <IconArrowLeft size={28} />
        </TouchableOpacity>
        <ViewBox flex={1} justifyContent="center" alignItems="center">
          <TextBox variant="2xl" color="mainText">
            {t("learn-the-surahs")}
          </TextBox>
        </ViewBox>
        <ViewBox style={{ marginHorizontal: 30, width: 28 }}></ViewBox>
      </ViewBox>

      {soundsLoading ? (
        <FullScreenLoader />
      ) : (
        <FlatList
          ref={listRef}
          renderItem={renderItem}
          data={duate}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}
    </ViewBox>
  );
}
