import React, { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { TextBox, ViewBox } from "../../styles/theme";

const getDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date;
};

const formatDate = (date: Date) => {
  const day = date.getDate();
  return `${day}`;
};

const formatDayOfWeek = (date: Date) => {
  const day = date.toLocaleString("default", { weekday: "short" });
  return `${day[0]}${day[1]}`;
};

type DayListTabs = {
  onDateSelection: (e: Date) => void;
};

export const DaysList = ({ onDateSelection }: DayListTabs) => {
  const days = Array.from({ length: 21 }, (_, i) => getDate(i - 10));
  const today = new Date();

  const todayIndex = days.findIndex(
    (day) =>
      day.getDate() === new Date().getDate() &&
      day.getMonth() === new Date().getMonth() &&
      day.getFullYear() === new Date().getFullYear()
  );

  const itemWidth = 34 + 8;
  const offset =
    todayIndex * itemWidth - (Dimensions.get("window").width - itemWidth) / 2;
  const [selectedDate, setSelectedDate] = useState(today);
  const handlePress = (date: Date) => () => {
    onDateSelection(date);
    setSelectedDate(date);
  };

  return (
    <ScrollView
      horizontal
      contentOffset={{ x: offset, y: 0 }}
      showsHorizontalScrollIndicator={false}
    >
      {days.map((date) => (
        <TouchableOpacity
          key={date.toISOString()}
          style={{ marginHorizontal: 4, alignItems: "center", marginTop: 20 }}
          onPress={handlePress(date)}
        >
          <ViewBox
            width={34}
            height={34}
            borderRadius="17"
            justifyContent="center"
            alignItems="center"
            backgroundColor={
              selectedDate &&
              selectedDate.toDateString() === date.toDateString()
                ? "lightGreen"
                : "white"
            }
          >
            <TextBox variant="md">{formatDate(date)}</TextBox>
          </ViewBox>
          <TextBox variant="xs" marginTop="xs">
            {formatDayOfWeek(date)}
          </TextBox>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
