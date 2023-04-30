import React from "react";
import { IconMoon, IconMoonStars, IconSun, IconSunLow, IconSunrise, IconSunset } from "tabler-icons-react-native";

export const retrunIconPrayerTimes = (activePrayer: string, size: number, color: string) => {
    if(!activePrayer) return;

    if(activePrayer.includes("isha")){
        return <IconMoonStars size={size} color={color}/>
    }
    if(activePrayer.includes("maghrib")){
        return <IconSunset size={size} color={color}/>
    }
    if(activePrayer.includes("asr")){
        return <IconSunLow size={size} color={color}/>
    }
    if(activePrayer.includes("dhuhr")){
        return <IconSun size={size} color={color}/>
    }
    if(activePrayer.includes("sunrise")){
        return <IconSunrise size={size} color={color}/>
    }
    if(activePrayer.includes("imsak")){
        return <IconMoon size={size} color={color}/>
    }
}