import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconArrowLeft } from "tabler-icons-react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextBox, ViewBox } from "../../styles/theme";
import { PlayableItem } from "./PlayableItem";
import { DuaType } from "../../data/duate";
import { Audio } from "expo-av";
import FullScreenLoader from "../../components/FullScreenLoader";
import i18n from "../../services/translation";

type SoundDataType = Omit<DuaType, "sound"> & { sound: Audio.Sound };

export function PrayerInsideLearnScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);
  const [currentSound, setCurrentSound] = useState<null | number>(null);
  const [soundsData, setSoundsData] = useState<SoundDataType[]>([]);
  const [soundsLoading, setSoundsLoading] = useState(true);
  const attemptCount = useRef(0); // useRef to store attempt count

  const duate: DuaType[] = [
    {
      title: i18n.t('initial-takbir'),
      sound: require("../../assets/sounds/1-tekbiri.mp3"),
      reading: i18n.t('allahu-akbar'),
      translation: i18n.t('allah-is-greatest'),
    },
    {
      title: i18n.t('dua-after-first-takbir'),
      reading: i18n.t('first-dua-reading'),
      sound: require("../../assets/sounds/2-pas-tekbirit.mp3"),
      translation: i18n.t('first-dua')
    },
    {
      title: "",
      reading: i18n.t('protection-from-god'),
      sound: require("../../assets/sounds/3-istiadheja.mp3"),
      translation: i18n.t('protection-from-god-translation'),
    },
    {
      title: "",
      reading: i18n.t('bismilah'),
      sound: require("../../assets/sounds/4-besmeleja.mp3"),
      translation: i18n.t('bismilah-translate'),
    },
    {
      title: i18n.t('surah-alfatiha'),
      reading: `1. Bismilahi rrahmani er-rahimi\n2. El-hamdu lillahi rabbil-'alemine\n3. Er-rahmani er-rahimi\n4. Maliki jewmi ed-dini\n5. ijake na'budu we 'ijake nesta'inu\n6. Ihdina es-siratel-mustekime\n7. Siratel-ledhine 'en'amte 'alejhim gajril-megdubi 'alejhim we la ed-dalline.`,
      sound: require("../../assets/sounds/5-fatiha.mp3"),
      translation: i18n.t('surah-alfatiha-translate'),
    },
    {
      title: i18n.t('surah-ikhlas'),
      reading: `1.Kul huwal-lahu 'ehad\n2. Allahu s-samed\n3. Lem jelid we lem juled\n4. Welem jekun lehu kufuen 'ehadun.`,
      translation: i18n.t('surah-ikhlas-translate'),
      sound: require("../../assets/sounds/6-surja-ihlas.mp3"),
    },
    {
      title: i18n.t('dua-ruku'),
      reading: i18n.t('dua-ruku-ar'),
      sound: require("../../assets/sounds/7-lutja-ruku.mp3"),
      translation: i18n.t('dua-ruku-translate'),
    },
    {
      title: i18n.t('dua-after-ruku'),
      reading: i18n.t('dua-after-ruku-ar'),
      sound: require("../../assets/sounds/8-lutja-ruku-duke-u-ngritur.mp3"),
      translation: i18n.t('dua-after-ruku-translate'),
    },
    {
      title: i18n.t('dua-after-s'),
      reading: i18n.t('dua-after-s-ar'),
      sound: require("../../assets/sounds/9-lutja-ruku-pasi-ngrihemi.mp3"),
      translation: i18n.t('dua-after-s-translate'),
    },
    {
      title: i18n.t('dua-sajdah'),
      reading: i18n.t('dua-sajdah-ar'),
      sound: require("../../assets/sounds/10-lutja-sexhde.mp3"),
      translation: i18n.t('dua-sajdah-translate'),
    },
    {
      title: i18n.t('dua-between-sajdah'),
      reading: i18n.t('dua-between-sajdah-ar'),
      sound: require("../../assets/sounds/11-lutja-mes-dy-sexhdeve.mp3"),
      translation: i18n.t('dua-between-sajdah-translate'),
    },
    {
      title: i18n.t('tehijat'),
      reading:i18n.t('tehijat-ar'),
      translation: i18n.t('tehijat-translate'),
      sound: require("../../assets/sounds/12-tehijati.mp3"),
    },
    {
      title: i18n.t('salavat'),
      reading:i18n.t('salavat-ar'),
      translation: i18n.t('salavat-translate'),
      sound: require("../../assets/sounds/13-salavatet.mp3"),
    },
    {
      title: i18n.t('dua-before-selam'),
      reading:i18n.t('dua-before-selam-ar'),
      translation:i18n.t('dua-before-selam-translate'),
      sound: require("../../assets/sounds/14-duaja-para-selamit.mp3"),
    },
    {
      title: i18n.t('selam'),
      reading: i18n.t('selam-ar'),
      translation: i18n.t('selam-translate'),
      sound: require("../../assets/sounds/15-selami.mp3"),
    },
    {
      title: i18n.t('dua-after-prayer'),
      reading: i18n.t('dua-after-prayer-ar'),
      translation: i18n.t('dua-after-prayer-translate'),
      sound: require("../../assets/sounds/16-dhikri-pas-selamit.mp3"),
    },
  ];
  
  const loadSoundsData = async () => {
    try {
      setSoundsLoading(true);
      const data: SoundDataType[] = await Promise.all(
        duate.map(async (x) => {
          const soundObj = await Audio.Sound.createAsync(x.sound);

          return {
            ...x,
            sound: soundObj.sound,
          };
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
            setTimeout(() => reject(new Error("Timeout")), 5000)
          ),
        ]);
      } catch (error) {
        console.log(`Attempt ${attemptCount.current} failed:`, error);
      }
    }
  };

  useEffect(() => {
    return () => {
      soundsData.forEach((x) => x.sound.unloadAsync());
    };
  }, [soundsData]);

  useEffect(() => {
    loadSoundWithRetry();
  }, []);

  const onPressBack = () => navigation?.goBack();

  const onPressPlay = (index: number) => {
    setCurrentSound(index);
    listRef.current?.scrollToIndex({ index, animated: true });
  };

  const keyExtractor = useCallback((item: DuaType) => item.title, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: DuaType }) => {
      return (
        <PlayableItem
          isAnotherSoundPlaying={
            currentSound !== null && currentSound !== index
          }
          onPressPlay={() => onPressPlay(index)}
          sound={item.sound}
          title={item.title}
          transliteration={item.reading}
          translation={item.translation}
        />
      );
    },
    [currentSound]
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
            {i18n.t('learn-the-surahs')}
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
          data={soundsData}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}
    </ViewBox>
  );
}
