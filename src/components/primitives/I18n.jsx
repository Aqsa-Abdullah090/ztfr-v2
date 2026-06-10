"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../locales/en.json";
import cz from "../../locales/cz.json";
import pk from "../../locales/pk.json";
import fr from "../../locales/fr.json";
import it from "../../locales/it.json";
import de from "../../locales/de.json";
import es from "../../locales/es.json";
import pt from "../../locales/pt.json";
import nl from "../../locales/nl.json";
import no from "../../locales/no.json";
import dk from "../../locales/dk.json";
import se from "../../locales/se.json";
import pl from "../../locales/pl.json";
import bg from "../../locales/bg.json";
import tr from "../../locales/tr.json";
import ae from "../../locales/ae.json";
import cn from "../../locales/cn.json";
import il from "../../locales/il.json";
import jp from "../../locales/jp.json";
import kp from "../../locales/kp.json";
import th from "../../locales/th.json";
import ph from "../../locales/ph.json";
import inLang from "../../locales/in.json";
import ru from "../../locales/ru.json";

const resources = {
  en: { translation: en },
  pk: { translation: pk },
  fr: { translation: fr },
  it: { translation: it },
  de: { translation: de },
  es: { translation: es },
  pt: { translation: pt },
  nl: { translation: nl },
  no: { translation: no },
  dk: { translation: dk },
  se: { translation: se },
  pl: { translation: pl },
  bg: { translation: bg },
  cz: { translation: cz },
  tr: { translation: tr },
  ae: { translation: ae },
  cn: { translation: cn },
  il: { translation: il },
  jp: { translation: jp },
  kp: { translation: kp },
  th: { translation: th },
  ph: { translation: ph },
  in: { translation: inLang },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;