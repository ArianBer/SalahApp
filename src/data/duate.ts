export type DuaType = {
  title: string;
  sound: any;
  reading: string;
  translation: string;
};

export const duate: DuaType[] = [
  {
    title: "Tekbiri Fillestarë",
    sound: require("../assets/sounds/1-tekbiri.mp3"),
    reading: "Allahu Ekber",
    translation: "Allahu është më i madhi.",
  },
  {
    title: "Lutja pas tekbirit fillestar",
    reading:
      "Subhânekell-llâhum-me ue bihamdike ue tebârrake-smuke, ue teâlâ xhed-duke, ue lâ ilâhe gajrruke.",
    sound: require("../assets/sounds/2-pas-tekbirit.mp3"),
    translation:
      "O Allah! Ti je pa të meta. Ty të bëj lavdi! Emri Yt është i bekuar, Madhëria jote është e Lartësuar, dhe askush s’ka të drejtë të adhurohet pos Teje!",
  },
  {
    title: "ISTIADHEJA",
    reading: "Eudhu bil-lahi minesh-shejtanirr-rraxhim",
    sound: require("../assets/sounds/3-istiadheja.mp3"),
    translation: "Kërkoj mbrojtje nga Allahu, prej shejtanit të mallkuar.",
  },
  {
    title: "Besmeleja",
    reading: "Bismil-lâhirr-rrahmânirr-rrahîm",
    sound: require("../assets/sounds/4-besmeleja.mp3"),
    translation:
      "Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëbërësit të madh!",
  },
  {
    title: "SUREJA EL-FATIHA",
    reading: `1. Bismilahi rrahmani er-rahimi\n2. El-hamdu lillahi rabbil-'alemine\n3. Er-rahmani er-rahimi\n4. Maliki jewmi ed-dini\n5. ijake na'budu we 'ijake nesta'inu\n6. Ihdina es-siratel-mustekime\n7. Siratel-ledhine 'en'amte 'alejhim gajril-megdubi 'alejhim we la ed-dalline.`,
    sound: require("../assets/sounds/5-fatiha.mp3"),
    translation: `1. Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëbërësit të madh!\n2. E tërë lavdia i takon vetëm Allahut, Zotit të botëve,\n3. të Gjithëmëshirshmit, Mëshirëbërësit të madh,\n4. Sunduesit në Ditën e Gjykimit (përgjegjësisë-shpërblimit)!\n5. Vetëm Ty të adhurojmë dhe vetëm prej Teje ndihmë kërkojmë!\n6. Udhëzona (dhe përforcona) në rrugën e drejtë!\n7. Në rrugën e atyre, të cilët i begatove me të mira, jo në të atyre që kundër vetes tërhoqën hidhërimin, e as në të atyre që e humbën veten!`,
  },
  {
    title: "Sureja El-Ihlas",
    reading: `1.Kul huwal-lahu 'ehad\n2. Allahu s-samed\n3. Lem jelid we lem juled\n4. Welem jekun lehu kufuen 'ehadun.`,
    translation: `Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëbërësit të madh!\n1. Thuaj: Ai, Allahu është Një!\n2. Allahu është Ai, që çdo krijesë i drejtohet (i mbështetet) për çdo nevojë.\n3. As s'ka lindur kënd, as nuk është i lindur,\n4. dhe Atij askush nuk i është i barabartë.`,
    sound: require("../assets/sounds/6-surja-ihlas.mp3"),
  },
  {
    title: "Lutja në ruku",
    reading: "Subhâne rrab-bijel Adhîm (tri herë)",
    sound: require("../assets/sounds/7-lutja-ruku.mp3"),
    translation: "I Dëlirë nga të metat është Zoti im, i Madhërishmi!",
  },
  {
    title: "Kur ngrihemi nga rukuja",
    reading: "Semiall-llâhu limen hamideh!",
    sound: require("../assets/sounds/8-lutja-ruku-duke-u-ngritur.mp3"),
    translation: "Allahu e pranon lavdinë e atij që i bën lavdi!",
  },
  {
    title: "Kur ngrihemi plotësisht në këmbë themi:",
    reading:
      "Rrab-benâ ue lekel hamdu hamden kethîrran taj-jiben mubârraken fîhi",
    sound: require("../assets/sounds/9-lutja-ruku-pasi-ngrihemi.mp3"),
    translation:
      "Zoti ynë, Ty të takon lavdia, lavdi e panumërt, e dëlirë nga syefaqësia dhe e pafundme",
  },
  {
    title: "Lutja në sexhde",
    reading: "Subhâne Rrab-bijel ea'lâ (tri herë)",
    sound: require("../assets/sounds/10-lutja-sexhde.mp3"),
    translation: "I Dëlirë nga të metat është Zoti im, më i Larti",
  },
  {
    title: "Lutja në uljen ndërmjet dy sexhdeve",
    reading: "Rrabbigfir lî, Rrabbigfir",
    sound: require("../assets/sounds/11-lutja-mes-dy-sexhdeve.mp3"),
    translation: "O Zoti im, më fal! O Zoti im, më fal!",
  },
  {
    title: "Tehijati gjatë të ndenjurit ulur në namaz",
    reading:
      "Et-tehij-jâtu lil-lâhi ues-saleuâtu, uet-taj-jibâtu, es-selâmu alejke ejjuhen-nebij-ju ue rrahmetull-llâhi ue berrakâtuhu, es-selâmu alejnâ ue alâ ibâdil-lâhis-sâlihîn, esh’hedu en lâ ilâhe il-lAll-llâh, ue esh’hedu en-ne Muham-meden abduhu ue rrasûluhu.",
    translation:
      "Nderimet, madhështimet, lutjet dhe fjalët e dëlira i takojnë Allahut!83 Paqedhënësi (Es Selamu) qoftë me ty, o i Dërguar, dhe po ashtu mëshira dhe begatimet e vazhdueshme të Tij! Paqedhënësi qoftë me ne dhe me robërit e drejtë të Allahut! Dëshmoj se nuk ka të drejtë të adhurohet kush përveç Allahut, dhe dëshmoj se Muhamedi është rob dhe i dërguar i Tij!",
    sound: require("../assets/sounds/12-tehijati.mp3"),
  },
  {
    title:
      "Salavatet për profetin (Lavdërimi dhe paqja e Allahut qofshin me të)",
    reading:
      "All-llâhum-me sal-li alâ Muhammedin ue alâ âli Muham-medin kemâ sal-lejte alâ Ibrrâhîme ue alâ âli Ibrrâhîme, in-neke hamîdun Mexhîd. All-llâhum-me bârik alâ Muhammedin ue alâ âli Muham-medin, kemâ bârrakte alâ Ibrrâhîme ue alâ âli Ibrrâhîme, in-neke hamîdun Mexhîd.",
    translation: `O Allah lavdëroje (tek melekët e lartë) Muhamedin dhe familjen e tij, ashtu siç lavdërove Ibrahimin dhe familjen e tij, vërtet Ti je i Lavdishëm dhe i Madhëruar. O Allah begatoje Muhamedin dhe familjen e tij, ashtu siç begatove Ibrahimin dhe familjen e tij, vërtet Ti je i Lavdishëm dhe i Madhëruar`,
    sound: require("../assets/sounds/13-salavatet.mp3"),
  },
  {
    title: "Duaja para selamit",
    reading:
      "Allahumme Rabbena atina fid-dunja haseneten, ve fil-ahireti haseneten ve kina 'adhaben-nar. Rabbena'gfir li ve li validejje ve lil-mu’minine jevme jekumul-hisab.",
    translation:
      "O All-llahu im, Zoti ynë, na jep të mira në këtë botëdhe në botën tjetër, dhe na ruaj nga dënimi me zjarr.Zoti ynë, më fal mua, prindërit e mi dhe besimtarëtditën kur do ta japim llogarinë",
    sound: require("../assets/sounds/14-duaja-para-selamit.mp3"),
  },
  {
    title: "Selami në fund të namazit",
    reading: "Es-Selāmu ‘alejkum we rahmetull-llāh",
    translation: "Paqja dhe mëshira e Allahut qoftë me ju!",
    sound: require("../assets/sounds/15-selami.mp3"),
  },
  {
    title: "Dhikri pas selamit",
    reading: `Estagfirrull-llâh (tri herë)\nAll-llâhum-me Entes-Selâm, ue minkes-selâm, tebârrakte jâ dhel xhelâli uel ikrrâm`,
    translation: `I kërkoj falje Allahut\nO Allah! Ti je Paqedhënësi dhe vetëm prej Teje pres paqen! Ti je përgjithmonë i Begatshëm, o Zotëruesi i madhështisë dhe nderimit!`,
    sound: require("../assets/sounds/16-dhikri-pas-selamit.mp3"),
  },
];
