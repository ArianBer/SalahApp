import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconArrowLeft } from "tabler-icons-react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextBox, ViewBox } from "../../styles/theme";
import { PlayableItem } from "./PlayableItem";
import { DuaType, duate } from "../../data/duate";
import { Audio } from "expo-av";
import FullScreenLoader from "../../components/FullScreenLoader";

type SoundDataType = Omit<DuaType, "sound"> & { sound: Audio.Sound };

export function PrayerInsideLearnScreen({ navigation }: { navigation: any }) {
  const { top } = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);
  const [currentSound, setCurrentSound] = useState<null | number>(null);
  const [soundsData, setSoundsData] = useState<SoundDataType[]>([]);
  const [soundsLoading, setSoundsLoading] = useState(true);
  const attemptCount = useRef(0); // useRef to store attempt count

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
            Meso Suret
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
