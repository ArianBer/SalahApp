import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Magnetometer, DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import LPF from "lpf";
import { SvgXml } from "react-native-svg";
import * as Permissions from "expo-permissions";
import { TextBox, ViewBox } from "../styles/theme";
import { Fonts } from "../styles";

function CompassSvg({ svgStyle }: { svgStyle?: any }) {
  const svgMarkup = `<svg width="394" height="394" viewBox="0 0 394 394" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_627_612)">
  <path d="M197 56.9616L210.596 84.3936H183.403L197 56.9616Z" fill="#090E1B"/>
  <path d="M270.716 270.716C311.428 230.004 311.428 163.996 270.716 123.284C230.004 82.572 163.996 82.572 123.284 123.284C82.572 163.996 82.572 230.004 123.284 270.716C163.996 311.428 230.004 311.428 270.716 270.716Z" stroke="#090E1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M123.505 123.505L130.323 130.323M263.677 263.677L270.495 270.495M123.505 270.495L130.323 263.677M263.677 130.323L270.495 123.505" stroke="#090E1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M93.0623 197L97 197M297 197L300.938 197M197 300.938L197 297M197 97.5L197 93.0622" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M96.6038 223.901L100.407 222.882M293.593 171.118L297.396 170.099M223.901 297.396L222.882 293.593M171.248 100.89L170.099 96.6038" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M106.987 248.969L110.398 247M283.603 147L287.013 145.031M248.969 287.013L247 283.602M147.25 110.83L145.031 106.987" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M145.031 287.013L147 283.603M247 110.397L248.969 106.987M287.013 248.969L283.603 247M110.831 147.25L106.987 145.031" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.2" d="M170.099 297.396L171.118 293.593M222.882 100.407L223.901 96.6037M297.396 223.901L293.593 222.882M100.891 171.247L96.604 170.099" stroke="#090E1B" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M197 230.448L180.276 197L197 163.552L213.724 197L197 230.448Z" stroke="#56791D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M135.099 254.37L133.713 252.984L143.938 242.76L145.324 244.145L142.453 258.245L142.071 257.863L150.556 249.378L151.942 250.764L141.718 260.989L140.332 259.603L143.202 245.503L143.584 245.885L135.099 254.37Z" fill="#090E1B"/>
  <path opacity="0.4" d="M252.656 148.319C252.071 148.903 251.411 149.271 250.676 149.422C249.94 149.572 249.186 149.506 248.413 149.224C247.63 148.931 246.89 148.436 246.193 147.739C245.542 147.088 245.094 146.405 244.849 145.688C244.585 144.972 244.529 144.264 244.679 143.567C244.821 142.86 245.17 142.19 245.726 141.559L247.126 142.959C246.655 143.506 246.447 144.09 246.504 144.712C246.56 145.335 246.876 145.933 247.451 146.508C248.092 147.149 248.757 147.512 249.445 147.597C250.124 147.692 250.718 147.484 251.227 146.975C251.642 146.56 251.859 146.108 251.878 145.617C251.887 145.137 251.708 144.599 251.34 144.005L250.053 141.926C249.403 140.899 249.101 139.946 249.148 139.07C249.177 138.193 249.549 137.396 250.266 136.68C250.878 136.067 251.562 135.685 252.316 135.534C253.061 135.374 253.829 135.444 254.621 135.746C255.404 136.038 256.158 136.548 256.884 137.274C257.572 137.962 258.067 138.683 258.369 139.437C258.652 140.192 258.732 140.932 258.609 141.658C258.468 142.384 258.129 143.053 257.591 143.666L256.177 142.252C256.658 141.752 256.851 141.163 256.757 140.484C256.653 139.814 256.281 139.159 255.64 138.518C254.961 137.839 254.272 137.453 253.575 137.358C252.868 137.255 252.264 137.453 251.765 137.952C251.359 138.358 251.142 138.801 251.114 139.282C251.086 139.763 251.26 140.305 251.637 140.908L252.938 142.973C253.58 143.991 253.881 144.953 253.844 145.858C253.787 146.763 253.391 147.583 252.656 148.319Z" fill="#090E1B"/>
  <path opacity="0.4" d="M253.136 260.135L239.871 252.951L241.313 251.508L249.431 255.892C249.77 256.081 250.119 256.288 250.477 256.515C250.836 256.741 251.246 257.01 251.708 257.321C251.378 256.821 251.114 256.397 250.916 256.048C250.727 255.69 250.534 255.336 250.336 254.987L246.023 246.799L247.522 245.3L255.696 249.627C256.054 249.816 256.417 250.019 256.785 250.235C257.153 250.452 257.563 250.712 258.015 251.013C257.676 250.485 257.398 250.047 257.181 249.698C256.973 249.34 256.79 249.015 256.629 248.722L252.245 240.576L253.659 239.162L260.801 252.47L259.472 253.799L248.908 248.185L254.494 258.777L253.136 260.135Z" fill="#090E1B"/>
  <path opacity="0.4" d="M134.062 140.667L140.299 134.43L150.524 144.655L144.287 150.891L143.014 149.619L148.501 144.131L148.417 145.319L144.669 141.572L140.299 145.942L139.069 144.711L143.439 140.341L139.62 136.523L140.836 136.466L135.349 141.953L134.062 140.667Z" fill="#090E1B"/>
  </g>
  <defs>
  <clipPath id="clip0_627_612">
  <rect width="278" height="278" fill="white" transform="translate(0.424316 197) rotate(-45)"/>
  </clipPath>
  </defs>
  </svg>
  `;

  return <SvgXml xml={svgMarkup} width="301px" height="301" style={svgStyle} />;
}

function MeccaSvg({ svgColor }: { svgColor?: any }) {
  const svgMarkup = `<svg width=${svgColor ? "58" : "52"}  height=${
    svgColor ? "61" : "55"
  } viewBox="0 0 52 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M48 22L26 34L4 22" stroke=${svgColor || "#56791D"} stroke-width="2"/>
  <path d="M25.9999 1.78479L48.2044 14.6046V40.2441L25.9999 53.0638L3.7954 40.2441V14.6046L25.9999 1.78479Z" stroke=${
    svgColor || "#090E1B"
  } stroke-width="2"/>
  </svg>
  `;

  return <SvgXml xml={svgMarkup} />;
}

function Kibla() {
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometer, setMagnetometer] = useState<number>(0);
  const styles = st();

  const [sub, setSub] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(true);

  const [direction, setDirection] = useState<number>(0);

  const find_angle = (x: number[], y: number[]): number => {
    const d = (degrees: number) => degrees * (Math.PI / 180);
    const r = (radians: number) => radians * (180 / Math.PI);

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

    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === "undetermined") {
      const { statusLocation } = await Permissions.askAsync(
        Permissions.LOCATION_FOREGROUND
      );

      if (statusLocation !== "granted") {
        setLoading(false);
        setError(true);
        return;
      }
    }

    const location = await Location.getCurrentPositionAsync({});

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
    (async () => request())();
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

  const _degree = (magnetometer: number) =>
    magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data: any) => {
        setMagnetometer((meter: number) => {
          const angle = meter - _angle(data);
          if (Math.abs(angle) > 2) {
            return Math.floor(meter - angle / 3);
          }
          return meter;
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

  const renderCompass = () => {
    const rotateAngle = 90 - magnetometer + direction;
    return (
      <>
        <MeccaSvg
          svgColor={
            _degree(magnetometer) >= 135 && _degree(magnetometer) <= 139
              ? "green"
              : ""
          }
        />
        <CompassSvg
          svgStyle={{ transform: [{ rotate: `${rotateAngle}deg` }] }}
        />
        <ViewBox style={styles.svg} />
        <ViewBox style={styles.svg}>
          <TextBox color="mainText" fontSize={24} fontFamily={Fonts.Bold}>
            {_degree(magnetometer)}°
          </TextBox>
        </ViewBox>
      </>
    );
  };

  const renderError = () => (
    <ViewBox marginBottom="xxxl" alignItems="center">
      <TextBox marginBottom="md">Lejo qasjen në lokacion</TextBox>
      <TextBox marginHorizontal="xxxl">
        Për të kalkuluar drejtimin e kibles, lejo qasjen në lokacionin tuaj.
      </TextBox>
      <TouchableOpacity onPress={() => request()}>
        <ViewBox paddingHorizontal="xxxl" marginTop="xxl" paddingVertical="xxl">
          <TextBox color="mainText" fontSize={20} fontFamily={Fonts.Medium}>
            Kërko qasjen
          </TextBox>
        </ViewBox>
      </TouchableOpacity>
    </ViewBox>
  );

  const renderInfo = () => (
    <ViewBox marginBottom="xxxxxl">
      <TextBox color="mainText" fontSize={24}>
        Kalibro kompasin
      </TextBox>
      <TextBox color="mainText" fontSize={18} marginTop="sm">
        Lëviz telefonin në formën e numrit 8 së paku tri herë
      </TextBox>
      <ViewBox paddingVertical="md">
        <TouchableOpacity onPress={() => setInfo(!info)}>
          <TextBox color="mainText" fontSize={24}>
            Vazhdo
          </TextBox>
        </TouchableOpacity>
      </ViewBox>
    </ViewBox>
  );

  const renderHorizontal = () => (
    <ViewBox marginBottom="xxxxl" marginHorizontal="xxxl">
      <TextBox marginBottom="xxl" color="mainText" fontSize={24}>
        Poziciono mirë telefonin
      </TextBox>
      <TextBox color="mainText" fontSize={24}>
        Mbaje telefonin horizontalisht ose vendose në një sipërfaqe të rrafshët
      </TextBox>
    </ViewBox>
  );

  const renderLoading = () => (
    <ViewBox alignItems="center" marginBottom="xxxxxl">
      <TextBox color="mainText" fontSize={22}>
        Loading...
      </TextBox>
    </ViewBox>
  );

  return (
    <ViewBox flex={1} backgroundColor="mainBackground">
      <TextBox
        fontSize={32}
        marginTop="xxxxxxxl"
        fontWeight="bold"
        marginHorizontal="xxxxxl"
        marginBottom="xl"
      >
        Kibla
      </TextBox>
      <ViewBox
        marginTop="9xl"
        alignItems="center"
        height="100%"
        paddingHorizontal="xxl"
      >
        {loading
          ? renderLoading()
          : info
          ? renderInfo()
          : error
          ? renderError()
          : horizontal
          ? renderHorizontal()
          : renderCompass()}
      </ViewBox>
    </ViewBox>
  );
}

const st = () =>
  StyleSheet.create({
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
    dot: (active: boolean) => ({
      transform: [{ scale: active ? 1.2 : 1 }],
    }),
  });

export default Kibla;
