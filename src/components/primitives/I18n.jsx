// components/primitives/I18n.jsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../locales/en.json"; //English
import CZ from "../../locales/cz.json"; //Czech
import PK from "../../locales/pk.json"; //urdu --> Pakistan
import FR from "../../locales/fr.json"; // FR --> France  French
import IT from "../../locales/it.json"; //Italian --> italy
import DE from "../../locales/de.json"; //DE --> Germany
import ES from "../../locales/es.json"; //ES --> Spain  Spanish
import PT from "../../locales/pt.json"; //PT --> Portugal Portuguese
import NL from "../../locales/nl.json"; //NL --> Netherlands  Dutch(Netherland)
import NO from "../../locales/no.json"; //NO --> Norway  Norwegian
import DK from "../../locales/dk.json"; //DK --> Denmark Danish
import SE from "../../locales/se.json"; //SE --> Sweden  Swedish
import PL from "../../locales/pl.json"; // PL --> Poland Polish(poland)
import BG from "../../locales/bg.json"; //BG --> Bulgaria Bulgarian
import TR from "../../locales/tr.json"; // TR --> Turkey Turkish
import AE from "../../locales/ae.json"; // AE --> United Arab Emirates Arabic
import CN from "../../locales/cn.json"; // CN --> China Chinese
import IL from "../../locales/il.json"; //IL - Israel Hebrew
import JP from "../../locales/jp.json"; //Japanese
import KP from "../../locales/kp.json"; //Korean
import TH from "../../locales/th.json"; //Thai
import PH from "../../locales/ph.json"; //Filipino
import IN from "../../locales/in.json"; // IN --> India hindi
import RU from "../../locales/ru.json";

const resources = {
  en: { translation: en },
  PK: { translation: PK },
  FR: { translation: FR },
  IT: { translation: IT },
  DE: { translation: DE },
  ES: { translation: ES },
  PT: { translation: PT },
  NL: { translation: NL },
  NO: { translation: NO },
  DK: { translation: DK },
  SE: { translation: SE },
  PL: { translation: PL },
  BG: { translation: BG },
  CZ: { translation: CZ },
  TR: { translation: TR },
  AE: { translation: AE },
  CN: { translation: CN },
  IL: { translation: IL },
  JP: { translation: JP },
  KP: { translation: KP },
  TH: { translation: TH },
  PH: { translation: PH },
  IN: { translation: IN },
  RU: { translation: RU },
};
// console.log(fr)

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
