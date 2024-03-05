import { Platform, PlatformIOSStatic } from "react-native";
import { LanguageType } from "../../services/translation/languges";
import { PartialRecord } from "../../types";

export type ApplicationDataType = {
  url: {
    ios: string;
    android: string;
  };
  image: string;
};

export type SettingsDataType = {
  facebook: Record<string, string>;
  youtube: Record<string, string>;
  web: Record<string, string>;
  applications: Record<string, ApplicationDataType>;
};

Platform.OS;
type SettingWithLanguageDataType = Record<LanguageType, SettingsDataType>;

export const settingsData: SettingWithLanguageDataType = {
  al: {
    facebook: {
      "Dr Shefqet Krasniqi":
        "https://www.facebook.com/Hoxha.Dr.Shefqet.Krasniqi?mibextid=zLoPMf",
      "Hoxhë Enis Rama":
        "https://www.facebook.com/hoxheenisrama?mibextid=zLoPMf",
      "Hoxhë Ekrem Avdiu":
        "https://www.facebook.com/EkremAvdiu971?mibextid=zLoPMf",
      "Hoxhë Ahmed Kalaja":
        "https://www.facebook.com/ahmedkalaja?mibextid=zLoPMf",
      "Hoxhë Irfan Salihu":
        "https://www.facebook.com/Hoxha.Irfan.Salihu?mibextid=zLoPMf",
      "Hoxhë Fadil Musliu":
        "https://www.facebook.com/profile.php?id=100045222094666&mibextid=zLoPMf",
      "Dr. Muhamed Broja":
        "https://www.facebook.com/MuhamedBroja?mibextid=zLoPMf",
      "Hoxhë Ismail Bardhoshi":
        "https://www.facebook.com/profile.php?id=100063541363429&mibextid=zLoPMf",
      "Hoxhë Fitim Gërguri":
        "https://www.facebook.com/hoxhefitimgerguri?mibextid=zLoPMf",
      "Hoxhë Muharrem Ismaili":
        "https://www.facebook.com/hoxhamuharem?mibextid=zLoPMf",
      "Dr. Sadat Rrustemi":
        "https://www.facebook.com/DrSadatRrustemi?mibextid=zLoPMf",
      "Hoxhë Irfan Jahiu":
        "https://www.facebook.com/HoxheIrfanJahiu?mibextid=zLoPMf",
      "Instituti islam Ikra":
        "https://www.facebook.com/Institutiikra?mibextid=zLoPMf",
      'Xhamia "Isa Beg"':
        "https://www.facebook.com/profile.php?id=100068359488563&mibextid=zLoPMf",
      Penda:
        "https://www.facebook.com/profile.php?id=61552720343987&mibextid=zLoPMf",
    },
    youtube: {
      "Dr. Shefqet Krasniqi":
        "https://youtube.com/@DrShefqetKrasniqi?si=WrXenS7s36gntwn5",
      "Hoxhë Enis Rama":
        "https://youtube.com/@hoxheenisrama?si=7NHnltPon-As9Tqn",
      "Hoxhë Sadullah Bajrami":
        "https://www.facebook.com/SadullahBajramiZyrtare?mibextid=zLoPMf",
      "Dr. Muhamed Broja":
        "https://youtube.com/@dr.muhamedbroja505?si=0O6AzbfQv5JJuQtf",
      "Hoxhë Ismail Bardhoshi":
        "https://youtube.com/@ismailbardhoshi9502?si=a0cwp2YyvoEvFFFc",
      "Hoxhë Fitim Gërguri":
        "https://youtube.com/@hoxhe.fitim.gerguri?si=T7sSxsTDYbiFiaIw",
      "Hoxhë Mirsim Maliçi":
        "https://youtube.com/@hoxhemirsimmalici?si=fbwrd0hRHBF3RMqY",
      "Hoxhë Omer Bajrami":
        "https://youtube.com/@HoxheOmerBajrami?si=JmuW70e8oPDox4kO",
      "Lulzim Susuri":
        "https://youtube.com/@LulzimSusuriOfficial?si=O-oBo0eHcW7zSPWB",
      "Hoxhë Mustafa Terniqi":
        "https://youtube.com/@HoxheMustafaTerniqi?si=m_MvX6i5-iGhLf53",
      "Ardian Elezi": "https://youtube.com/@ArdianElezi?si=Ujx2Hux-fwcji88W",
      "Qendra për studime islame":
        "https://youtube.com/@HarmonyMedia1?si=UuG6wt9KuF86FyzX",
      "Peace TV": "https://youtube.com/@PeaceTVAlbanian?si=3xGlxhJTJEkHQPke",
      Audionur: "https://youtube.com/@audionurshkurt?si=VU_NcB7kQuqOLpav",
      "Thirrja islame":
        "https://youtube.com/@ThirrjaIslame?si=U0BC4zKIcEPKAf2s",
      "Muslimani ideal":
        "https://youtube.com/@MuslimaniIdeal?si=XZk49JQsIiayXvq7",
      "Akademia ether":
        "https://youtube.com/@ether.academy?si=x3DPmhZksVk7Cg3_",
      "Përkujtuesi ditor":
        "https://youtube.com/@PerkujtuesiDitor?si=siILmR_HiWydNTxq",
    },
    web: {
      "Kerko Sure": "https://kuran-index.com/Home/Suret",
      Hadithet: "https://hadithet.com",
    },
    applications: {
      "Enis Rama": {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.app.enisrama",
          ios: "https://apps.apple.com/tr/app/enis-rama/id1236706762",
        },
        image:
          "https://play-lh.googleusercontent.com/gfd7_xCP9pFA80Z27kd4R2c80Sn1mXeyuna5g9aYz-_qLAlx3Xb84HvXD2yOq0N12BLk=w480-h960-rw",
      },
      "Hoxhe Bajram Karabeg": {
        url: {
          ios: "https://t.me/bajramkarabegEnglish",
          android: "https://t.me/bajramkarabegEnglish",
        },
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png",
      },
      "Quran Start": {
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/c4/4c/f7/c44cf720-1568-70e8-2991-d37f6c1c9e37/AppIcon-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp",
        url: {
          ios: "https://apps.apple.com/us/app/quranstart/id1546283245",
          android:
            "https://play.google.com/store/apps/details?id=com.elifproject&hl=en_US",
        },
      },
      "Muslimani Ideal": {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.muslimani.ideal",
          ios: "https://apps.apple.com/ba/app/muslimani-ideal/id1611396758",
        },
        image:
          "https://play-lh.googleusercontent.com/N7BO--wpr0wQJE8Z818awjCW_0YB5aYlSyooAqNnhzZ5EEhtm-PEayRxjnwVTiMWFQ=s96-rw",
      },
      "Quran Words": {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.dawah.quranwords",
          ios: "https://apps.apple.com/us/app/quranwords/id6446705741",
        },
        image:
          "https://play-lh.googleusercontent.com/WHekx2ood--w7wqMJkyKNb3_F0gMFpJKLx6SatkFr1eBScJejGeFjSIi7fwc9Rs2wA8=w480-h960-rw",
      },
      Quran: {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.quran.labs.androidquran",
          ios: "https://apps.apple.com/us/app/quran-by-quran-com-%D9%82%D8%B1%D8%A2%D9%86/id1118663303",
        },
        image:
          "https://play-lh.googleusercontent.com/zoyAL6BWpiHrgyFEujQcEXhBqZn4SfX0JiIFqOecs2JoZYy39Yam8xiz7Vq6kP7S2w=w480-h960-rw",
      },
    },
  },
  en: {
    facebook: {
      "Mufti Menk": "https://www.facebook.com/muftimenk?mibextid=zLoPMf",
      "Dr Muhammad Salah":
        "https://www.facebook.com/MSalahOfficial?mibextid=zLoPMf",
      "Haitham al Haddad":
        "https://www.facebook.com/Sh.Dr.Haitham.al.Haddad?mibextid=zLoPMf",
      "Assim al hakeem":
        "https://www.facebook.com/SheikhAssimAlhakeemTeam?mibextid=zLoPMf",
    },
    youtube: {
      "Assim al hakeem":
        "https://youtube.com/@assimalhakeem?si=7pT8smIjP8L24dYb",
      "Mufti Menk":
        "https://youtube.com/@muftimenkofficial?si=1LahQQXajMcYnP93",
      "Zakir Naik": "https://youtube.com/@Drzakirchannel?si=f9hcbrf26rd1JudD",
    },
    web: {
      Quran: "https://quran.com/en",
      "One hadith": "https://onehadith.org/",
    },
    applications: {
      Quran: {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.quran.labs.androidquran",
          ios: "https://apps.apple.com/us/app/quran-by-quran-com-%D9%82%D8%B1%D8%A2%D9%86/id1118663303",
        },
        image:
          "https://play-lh.googleusercontent.com/zoyAL6BWpiHrgyFEujQcEXhBqZn4SfX0JiIFqOecs2JoZYy39Yam8xiz7Vq6kP7S2w=w480-h960-rw",
      },
      "Quran Words": {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.dawah.quranwords",
          ios: "https://apps.apple.com/us/app/quranwords/id6446705741",
        },
        image:
          "https://play-lh.googleusercontent.com/WHekx2ood--w7wqMJkyKNb3_F0gMFpJKLx6SatkFr1eBScJejGeFjSIi7fwc9Rs2wA8=w480-h960-rw",
      },
      "Quran Start": {
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/c4/4c/f7/c44cf720-1568-70e8-2991-d37f6c1c9e37/AppIcon-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp",
        url: {
          ios: "https://apps.apple.com/us/app/quranstart/id1546283245",
          android:
            "https://play.google.com/store/apps/details?id=com.elifproject&hl=en_US",
        },
      },
    },
  },
  de: {
    facebook: {
      "Mufti Menk": "https://www.facebook.com/muftimenk?mibextid=zLoPMf",
      "Dr Muhammad Salah":
        "https://www.facebook.com/MSalahOfficial?mibextid=zLoPMf",
      "Haitham al Haddad":
        "https://www.facebook.com/Sh.Dr.Haitham.al.Haddad?mibextid=zLoPMf",
      "Assim al hakeem":
        "https://www.facebook.com/SheikhAssimAlhakeemTeam?mibextid=zLoPMf",
    },
    youtube: {
      "Assim al hakeem":
        "https://youtube.com/@assimalhakeem?si=7pT8smIjP8L24dYb",
      "Mufti Menk":
        "https://youtube.com/@muftimenkofficial?si=1LahQQXajMcYnP93",
      "Zakir Naik": "https://youtube.com/@Drzakirchannel?si=f9hcbrf26rd1JudD",
    },
    web: {
      Quran: "https://quran.com/en",
      "One hadith": "https://onehadith.org/",
    },
    applications: {
      Quran: {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.quran.labs.androidquran",
          ios: "https://apps.apple.com/us/app/quran-by-quran-com-%D9%82%D8%B1%D8%A2%D9%86/id1118663303",
        },
        image:
          "https://play-lh.googleusercontent.com/zoyAL6BWpiHrgyFEujQcEXhBqZn4SfX0JiIFqOecs2JoZYy39Yam8xiz7Vq6kP7S2w=w480-h960-rw",
      },
      "Quran Words": {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.dawah.quranwords",
          ios: "https://apps.apple.com/us/app/quranwords/id6446705741",
        },
        image:
          "https://play-lh.googleusercontent.com/WHekx2ood--w7wqMJkyKNb3_F0gMFpJKLx6SatkFr1eBScJejGeFjSIi7fwc9Rs2wA8=w480-h960-rw",
      },
      "Quran Start": {
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/c4/4c/f7/c44cf720-1568-70e8-2991-d37f6c1c9e37/AppIcon-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp",
        url: {
          ios: "https://apps.apple.com/us/app/quranstart/id1546283245",
          android:
            "https://play.google.com/store/apps/details?id=com.elifproject&hl=en_US",
        },
      },
    },
  },
  mk: {
    facebook: {
      "Mufti Menk": "https://www.facebook.com/muftimenk?mibextid=zLoPMf",
      "Dr Muhammad Salah":
        "https://www.facebook.com/MSalahOfficial?mibextid=zLoPMf",
      "Haitham al Haddad":
        "https://www.facebook.com/Sh.Dr.Haitham.al.Haddad?mibextid=zLoPMf",
      "Assim al hakeem":
        "https://www.facebook.com/SheikhAssimAlhakeemTeam?mibextid=zLoPMf",
    },
    youtube: {
      "Assim al hakeem":
        "https://youtube.com/@assimalhakeem?si=7pT8smIjP8L24dYb",
      "Mufti Menk":
        "https://youtube.com/@muftimenkofficial?si=1LahQQXajMcYnP93",
      "Zakir Naik": "https://youtube.com/@Drzakirchannel?si=f9hcbrf26rd1JudD",
    },
    web: {
      Quran: "https://quran.com/en",
      "One hadith": "https://onehadith.org/",
    },
    applications: {
      Quran: {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.quran.labs.androidquran",
          ios: "https://apps.apple.com/us/app/quran-by-quran-com-%D9%82%D8%B1%D8%A2%D9%86/id1118663303",
        },
        image:
          "https://play-lh.googleusercontent.com/zoyAL6BWpiHrgyFEujQcEXhBqZn4SfX0JiIFqOecs2JoZYy39Yam8xiz7Vq6kP7S2w=w480-h960-rw",
      },
      "Quran Words": {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.dawah.quranwords",
          ios: "https://apps.apple.com/us/app/quranwords/id6446705741",
        },
        image:
          "https://play-lh.googleusercontent.com/WHekx2ood--w7wqMJkyKNb3_F0gMFpJKLx6SatkFr1eBScJejGeFjSIi7fwc9Rs2wA8=w480-h960-rw",
      },
      "Quran Start": {
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/c4/4c/f7/c44cf720-1568-70e8-2991-d37f6c1c9e37/AppIcon-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp",
        url: {
          ios: "https://apps.apple.com/us/app/quranstart/id1546283245",
          android:
            "https://play.google.com/store/apps/details?id=com.elifproject&hl=en_US",
        },
      },
    },
  },
  tr: {
    facebook: {
      "Mufti Menk": "https://www.facebook.com/muftimenk?mibextid=zLoPMf",
      "Dr Muhammad Salah":
        "https://www.facebook.com/MSalahOfficial?mibextid=zLoPMf",
      "Haitham al Haddad":
        "https://www.facebook.com/Sh.Dr.Haitham.al.Haddad?mibextid=zLoPMf",
      "Assim al hakeem":
        "https://www.facebook.com/SheikhAssimAlhakeemTeam?mibextid=zLoPMf",
    },
    youtube: {
      "Assim al hakeem":
        "https://youtube.com/@assimalhakeem?si=7pT8smIjP8L24dYb",
      "Mufti Menk":
        "https://youtube.com/@muftimenkofficial?si=1LahQQXajMcYnP93",
      "Zakir Naik": "https://youtube.com/@Drzakirchannel?si=f9hcbrf26rd1JudD",
    },
    web: {
      Quran: "https://quran.com/en",
      "One hadith": "https://onehadith.org/",
    },
    applications: {
      Quran: {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.quran.labs.androidquran",
          ios: "https://apps.apple.com/us/app/quran-by-quran-com-%D9%82%D8%B1%D8%A2%D9%86/id1118663303",
        },
        image:
          "https://play-lh.googleusercontent.com/zoyAL6BWpiHrgyFEujQcEXhBqZn4SfX0JiIFqOecs2JoZYy39Yam8xiz7Vq6kP7S2w=w480-h960-rw",
      },
      "Quran Words": {
        url: {
          android:
            "https://play.google.com/store/apps/details?id=com.dawah.quranwords",
          ios: "https://apps.apple.com/us/app/quranwords/id6446705741",
        },
        image:
          "https://play-lh.googleusercontent.com/WHekx2ood--w7wqMJkyKNb3_F0gMFpJKLx6SatkFr1eBScJejGeFjSIi7fwc9Rs2wA8=w480-h960-rw",
      },
      "Quran Start": {
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/c4/4c/f7/c44cf720-1568-70e8-2991-d37f6c1c9e37/AppIcon-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp",
        url: {
          ios: "https://apps.apple.com/us/app/quranstart/id1546283245",
          android:
            "https://play.google.com/store/apps/details?id=com.elifproject&hl=en_US",
        },
      },
    },
  },
};
