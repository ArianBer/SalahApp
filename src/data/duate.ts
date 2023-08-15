type DuateType = {
  title: string;
  sound: any;
  reading: string;
  translation: string;
};

export const duate: DuateType[] = [
  {
    title: "Tekbiri Fillestarë",
    sound: require("../assets/sounds/1.Tekbiri_Fillestarë.mp3"),
    reading: "Allahu Ekber",
    translation: "Allahu është më i madhi.",
  },
  {
    title: "Lutja pas tekbirit fillestar",
    reading:
      "Subhânekell-llâhum-me ue bihamdike ue tebârrake-smuke, ue teâlâ xhed-duke, ue lâ ilâhe gajrruke.",
    sound: require("../assets/sounds/2. Lutja pas tekbirit fillestar.mp3"),
    translation:
      "O Allah! Ti je pa të meta. Ty të bëj lavdi! Emri Yt është i bekuar, Madhëria jote është e Lartësuar, dhe askush s’ka të drejtë të adhurohet pos Teje!",
  },
  {
    title: "ISTIADHEJA",
    reading: "Eudhu bil-lahi minesh-shejtanirr-rraxhim",
    sound: require("../assets/sounds/3. Istiadheja.mp3"),
    translation: "Kërkoj mbrojtje nga Allahu, prej shejtanit të mallkuar.",
  },
  {
    title: "Besmeleja",
    reading: "Bismil-lâhirr-rrahmânirr-rrahîm",
    sound: require("../assets/sounds/4. Besmeleja.mp3"),
    translation:
      "Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëbërësit të madh!",
  },
  {
    title: "SUREJA EL-FATIHA",
    reading: "",
    sound: require("../assets/sounds/5.Sureja_El-Fatiha.mp3"),
    translation: `1. Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëbërësit të madh!\n2. E tërë lavdia i takon vetëm Allahut, Zotit të botëve,\n3. të Gjithëmëshirshmit, Mëshirëbërësit të madh,\n4. Sunduesit në Ditën e Gjykimit (përgjegjësisë-shpërblimit)!\n5. Vetëm Ty të adhurojmë dhe vetëm prej Teje ndihmë kërkojmë!\n6. Udhëzona (dhe përforcona) në rrugën e drejtë!\n7. Në rrugën e atyre, të cilët i begatove me të mira, jo në të atyre që kundër vetes tërhoqën hidhërimin, e as në të atyre që e humbën veten!`,
  },
  {
    title: "Lutja në ruku",
    reading: "Subhâne rrab-bijel Adhîm (tri herë)",
    sound: require("../assets/sounds/7. Lutja në ruku.mp3"),
    translation: "I Dëlirë nga të metat është Zoti im, i Madhërishmi!",
  },
  {
    title: "Kur ngrihemi nga rukuja",
    reading: "Semiall-llâhu limen hamideh!",
    sound: require("../assets/sounds/8. Kur ngrihemi nga rukuja.mp3"),
    translation: "Allahu e pranon lavdinë e atij që i bën lavdi!",
  },
  {
    title: "Kur ngrihemi plotësisht në këmbë themi:",
    reading:
      "Rrab-benâ ue lekel hamdu hamden kethîrran taj-jiben mubârraken fîhi",
    sound: null,
    translation:
      "Zoti ynë, Ty të takon lavdia, lavdi e panumërt, e dëlirë nga syefaqësia dhe e pafundme",
  },
  {
    title: "Lutja në sexhde",
    reading: "Subhâne Rrab-bijel ea’lâ (tri herë)",
    sound: require("../assets/sounds/10.Lutja_në_sexhde.mp3"),
    translation: "I Dëlirë nga të metat është Zoti im, më i Larti",
  },
  {
    title: "Lutja në uljen ndërmjet dy sexhdeve",
    reading: "Rrabbigfir lî, Rrabbigfir",
    sound: require("../assets/sounds/11.Lutja_ndërmjet_dy_sexhdeve.mp3"),
    translation: "O Zoti im, më fal! O Zoti im, më fal!",
  },
];
