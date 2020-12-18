import React from 'react'
import { I18nManager, Text } from 'react-native'
import * as RNLocalize from 'react-native-localize'
import I18n from "i18n-js"

import tr from "../values/languages/tr"
import en from "../values/languages/en"
import ar from "../values/languages/ar"


const locales = RNLocalize.getLocales()
// I18n.locale = locales[0].languageTag   // Sistem dilini kullan
I18n.locale = "tr"
export const currentLanguage = I18n.locale
export const isRtl = locales[0].isRTL || I18n.locale == 'ar'
export const hiddenArabicCharacter = isRtl ? <Text style={[{ fontSize: 0 }]}>؞</Text> : null
I18nManager.forceRTL(isRtl)
I18n.fallbacks = true
I18n.defaultLocale = 'tr-TR'
I18n.translations = {
  tr,
  en,
  ar,
}

export default I18n