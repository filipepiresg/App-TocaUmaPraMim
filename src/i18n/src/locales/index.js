import I18n from 'react-native-i18n'
import en from './en-US'
import ptBR from './pt-BR'

I18n.fallbacks = true
I18n.defaultLocale = "pt-BR";
I18n.locale = "pt-BR";

I18n.translations = {
  'en-US': en,
  'pt-BR': ptBR
}

const translate = key => I18n.t(key)

export default translate