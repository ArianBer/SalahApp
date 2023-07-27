import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Magnetometer, DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import CompassSvg from "../assets/images/compass/compass.svg";
import ArrowSvg from "../assets/images/compass/arrow.svg";
import MeccaSvg from "../assets/images/compass/mecca.svg";
import LPF from "lpf";
import { TextBox, ViewBox } from "../styles/theme";
import { SvgXml } from "react-native-svg";

function Kibla() {
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometer, setMagnetometer] = useState<number>(0);

  const [sub, setSub] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(true);

  const [seconds, setSeconds] = useState<number>(12);

  const [direction, setDirection] = useState<number>(0);

  const find_angle = (x: number[], y: number[]): number => {
    var d = (degrees: number) => degrees * (Math.PI / 180);
    var r = (radians: number) => radians * (180 / Math.PI);

    const x0 = d(x[0]);
    const y0 = d(y[0]);

    const difL = d(Math.abs(y[1] - x[1]));
    const a = Math.cos(y0) * Math.sin(difL);
    const b =
      Math.cos(x0) * Math.sin(y0) -
      Math.sin(x0) * Math.cos(y0) * Math.cos(difL);
    return r(Math.atan2(a, b));
  };

  const request = async () => {
    setLoading(true);

    let { status } = await Location.getForegroundPermissionsAsync();

    let location = await Location.getCurrentPositionAsync({});

    const point1 = [location.coords.latitude, location.coords.longitude];
    const point2 = [21.422528, 39.826191];

    const dir = find_angle(point1, point2);
    setDirection(dir);

    setError(false);
    setLoading(false);

    _toggle();
    return () => {
      _unsubscribe();
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((sec) => {
        if (sec <= 0) {
          clearInterval(interval);
        }
        return sec - 1;
      });
    }, 1000);

    (async () => {
      return await request();
    })();
  }, []);

  const _fast = () => {
    Magnetometer.setUpdateInterval(60);
  };

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      LPF.init([]);
      LPF.smoothing = 0.4;
      _fast();
      _subscribe();
    }
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    sub && sub.remove();
    setSubscription(null);
    setSub(null);
  };

  const _angle = (magnetometer: any) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      y = Math.round(y);
      x = Math.round(x);
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(LPF.next(angle));
  };

  const _degree = (magnetometer: number) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data: any) => {
        setMagnetometer((meter: number) => {
          const angle = meter - _angle(data);
          if (Math.abs(angle) > 2) {
            return Math.floor(meter - angle / 3);
          } else {
            return meter;
          }
        });
      })
    );

    setSub(
      DeviceMotion.addListener(({ rotation }: any) => {
        if (rotation?.beta > 0.4 || rotation?.beta < -0.4) {
          setHorizontal(true);
        } else {
          setHorizontal(false);
        }
      })
    );
  };

  const renderCompass = () => (
    <>
      <ViewBox style={styles.svg}>
        <SvgXml xml={CompassSvg} width={320} height={320} />
      </ViewBox>
      <ViewBox style={styles.svg}>
        <ViewBox style={styles.arrow}>
          <ViewBox></ViewBox>
          <SvgXml xml={ArrowSvg} width={320} height={320} />
        </ViewBox>
      </ViewBox>
      <ViewBox style={styles.svg}>
        <TextBox>{_degree(magnetometer)}°</TextBox>
      </ViewBox>
    </>
  );

  const renderError = () => (
    <ViewBox marginBottom="xxxl" alignItems="center">
      <TextBox marginBottom="md">Lejo qasjen në lokacion</TextBox>
      <TextBox marginHorizontal="xxxl">
        Për të kalkuluar drejtimin e kibles, lejo qasjen në lokacionin tuaj.
      </TextBox>
      <TouchableOpacity onPress={request}>
        <ViewBox paddingHorizontal="xxxl" marginTop="xxl" paddingVertical="xxl">
          <TextBox>Kërko qasjen</TextBox>
        </ViewBox>
      </TouchableOpacity>
    </ViewBox>
  );

  const renderInfo = () => (
    <ViewBox marginBottom="xxxxxl">
      <TextBox>Kalibro kompasin</TextBox>
      <TextBox marginHorizontal="xxxxl">
        Lëviz telefonin në formën e numrit 8 së paku tri herë
      </TextBox>
      {seconds > 0 ? (
        <ViewBox paddingHorizontal="xxxxl" paddingVertical="md">
          <TextBox>Vazhdo ({seconds})</TextBox>
        </ViewBox>
      ) : (
        <ViewBox paddingHorizontal="xxxl" marginTop="xxxxl">
          <TextBox>Vazhdo</TextBox>
        </ViewBox>
      )}
    </ViewBox>
  );

  const renderHorizontal = () => (
    <ViewBox marginBottom="xxxxl">
      <TextBox marginBottom="xxl">Poziciono mirë telefonin</TextBox>
      <TextBox marginHorizontal="xxxxl">
        Mbaje telefonin horizontalisht ose vendose në një sipërfaqe të rrafshët
      </TextBox>
    </ViewBox>
  );

  const renderLoading = () => (
    <ViewBox alignItems="center" marginBottom="xxl">
      <TextBox>Loading...</TextBox>
    </ViewBox>
  );

  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      {seconds <= 0 ? (
        <ViewBox>
          <TextBox>@</TextBox>
        </ViewBox>
      ) : (
        <></>
      )}
      {renderCompass()}
    </ViewBox>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  list: {
    flexGrow: 0,
    marginBottom: 16,
  },
  bigList: {
    marginBottom: 24,
  },
  svg: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  arrow: {
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
  },
});

export default Kibla;
