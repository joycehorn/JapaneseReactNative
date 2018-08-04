import I18n, { getLanguages } from 'react-native-i18n';
import Tts from 'react-native-tts';

getLanguages().then(languages => {
  console.log('All languages', languages);
});

I18n.fallbacks = true;

I18n.translations = {
  en: {
    app: require('./locales/en/app'),
    minna: {
      1: require('./minna/en/1'),
      2: require('./minna/en/2'),
      3: require('./minna/en/3'),
      4: require('./minna/en/4'),
      5: require('./minna/en/5'),
      6: require('./minna/en/6'),
      7: require('./minna/en/7'),
      8: require('./minna/en/8'),
      9: require('./minna/en/9'),
      10: require('./minna/en/10'),
      11: require('./minna/en/11'),
      12: require('./minna/en/12'),
      13: require('./minna/en/13'),
      14: require('./minna/en/14'),
      15: require('./minna/en/15'),
      16: require('./minna/en/16'),
      17: require('./minna/en/17'),
      18: require('./minna/en/18'),
      19: require('./minna/en/19'),
      20: require('./minna/en/20'),
      21: require('./minna/en/21'),
      22: require('./minna/en/22'),
      23: require('./minna/en/23'),
      24: require('./minna/en/24'),
      25: require('./minna/en/25'),
      26: require('./minna/en/26'),
      27: require('./minna/en/27'),
      28: require('./minna/en/28'),
      29: require('./minna/en/29'),
      30: require('./minna/en/30'),
      31: require('./minna/en/31'),
      32: require('./minna/en/32'),
      33: require('./minna/en/33'),
      34: require('./minna/en/34'),
      35: require('./minna/en/35'),
      36: require('./minna/en/36'),
      37: require('./minna/en/37'),
      38: require('./minna/en/38'),
      39: require('./minna/en/39'),
      40: require('./minna/en/40'),
      41: require('./minna/en/41'),
      42: require('./minna/en/42'),
      43: require('./minna/en/43'),
      44: require('./minna/en/44'),
      45: require('./minna/en/45'),
      46: require('./minna/en/46'),
      47: require('./minna/en/47'),
      48: require('./minna/en/48'),
      49: require('./minna/en/49'),
      50: require('./minna/en/50'),
    },
  },
  zh: {
    app: require('./locales/zh/app'),
    minna: {
      1: require('./minna/zh/1'),
      2: require('./minna/zh/2'),
      3: require('./minna/zh/3'),
      4: require('./minna/zh/4'),
      5: require('./minna/zh/5'),
      6: require('./minna/zh/6'),
      7: require('./minna/zh/7'),
      8: require('./minna/zh/8'),
      9: require('./minna/zh/9'),
      10: require('./minna/zh/10'),
      11: require('./minna/zh/11'),
      12: require('./minna/zh/12'),
      13: require('./minna/zh/13'),
      14: require('./minna/zh/14'),
      15: require('./minna/zh/15'),
      16: require('./minna/zh/16'),
      17: require('./minna/zh/17'),
      18: require('./minna/zh/18'),
      19: require('./minna/zh/19'),
      20: require('./minna/zh/20'),
      21: require('./minna/zh/21'),
      22: require('./minna/zh/22'),
      23: require('./minna/zh/23'),
      24: require('./minna/zh/24'),
      25: require('./minna/zh/25'),
      26: require('./minna/zh/26'),
      27: require('./minna/zh/27'),
      28: require('./minna/zh/28'),
      29: require('./minna/zh/29'),
      30: require('./minna/zh/30'),
      31: require('./minna/zh/31'),
      32: require('./minna/zh/32'),
      33: require('./minna/zh/33'),
      34: require('./minna/zh/34'),
      35: require('./minna/zh/35'),
      36: require('./minna/zh/36'),
      37: require('./minna/zh/37'),
      38: require('./minna/zh/38'),
      39: require('./minna/zh/39'),
      40: require('./minna/zh/40'),
      41: require('./minna/zh/41'),
      42: require('./minna/zh/42'),
      43: require('./minna/zh/43'),
      44: require('./minna/zh/44'),
      45: require('./minna/zh/45'),
      46: require('./minna/zh/46'),
      47: require('./minna/zh/47'),
      48: require('./minna/zh/48'),
      49: require('./minna/zh/49'),
      50: require('./minna/zh/50'),
    },
  },
  'zh-Hant': {
    app: require('./locales/zh-Hant/app'),
    minna: {
      1: require('./minna/zh-Hant/1'),
      2: require('./minna/zh-Hant/2'),
      3: require('./minna/zh-Hant/3'),
      4: require('./minna/zh-Hant/4'),
      5: require('./minna/zh-Hant/5'),
      6: require('./minna/zh-Hant/6'),
      7: require('./minna/zh-Hant/7'),
      8: require('./minna/zh-Hant/8'),
      9: require('./minna/zh-Hant/9'),
      10: require('./minna/zh-Hant/10'),
      11: require('./minna/zh-Hant/11'),
      12: require('./minna/zh-Hant/12'),
      13: require('./minna/zh-Hant/13'),
      14: require('./minna/zh-Hant/14'),
      15: require('./minna/zh-Hant/15'),
      16: require('./minna/zh-Hant/16'),
      17: require('./minna/zh-Hant/17'),
      18: require('./minna/zh-Hant/18'),
      19: require('./minna/zh-Hant/19'),
      20: require('./minna/zh-Hant/20'),
      21: require('./minna/zh-Hant/21'),
      22: require('./minna/zh-Hant/22'),
      23: require('./minna/zh-Hant/23'),
      24: require('./minna/zh-Hant/24'),
      25: require('./minna/zh-Hant/25'),
      26: require('./minna/zh-Hant/26'),
      27: require('./minna/zh-Hant/27'),
      28: require('./minna/zh-Hant/28'),
      29: require('./minna/zh-Hant/29'),
      30: require('./minna/zh-Hant/30'),
      31: require('./minna/zh-Hant/31'),
      32: require('./minna/zh-Hant/32'),
      33: require('./minna/zh-Hant/33'),
      34: require('./minna/zh-Hant/34'),
      35: require('./minna/zh-Hant/35'),
      36: require('./minna/zh-Hant/36'),
      37: require('./minna/zh-Hant/37'),
      38: require('./minna/zh-Hant/38'),
      39: require('./minna/zh-Hant/39'),
      40: require('./minna/zh-Hant/40'),
      41: require('./minna/zh-Hant/41'),
      42: require('./minna/zh-Hant/42'),
      43: require('./minna/zh-Hant/43'),
      44: require('./minna/zh-Hant/44'),
      45: require('./minna/zh-Hant/45'),
      46: require('./minna/zh-Hant/46'),
      47: require('./minna/zh-Hant/47'),
      48: require('./minna/zh-Hant/48'),
      49: require('./minna/zh-Hant/49'),
      50: require('./minna/zh-Hant/50'),
    },
  },
  vi: {
    app: require('./locales/vi/app'),
    minna: {
      1: require('./minna/vi/1'),
      2: require('./minna/vi/2'),
      3: require('./minna/vi/3'),
      4: require('./minna/vi/4'),
      5: require('./minna/vi/5'),
      6: require('./minna/vi/6'),
      7: require('./minna/vi/7'),
      8: require('./minna/vi/8'),
      9: require('./minna/vi/9'),
      10: require('./minna/vi/10'),
      11: require('./minna/vi/11'),
      12: require('./minna/vi/12'),
      13: require('./minna/vi/13'),
      14: require('./minna/vi/14'),
      15: require('./minna/vi/15'),
      16: require('./minna/vi/16'),
      17: require('./minna/vi/17'),
      18: require('./minna/vi/18'),
      19: require('./minna/vi/19'),
      20: require('./minna/vi/20'),
      21: require('./minna/vi/21'),
      22: require('./minna/vi/22'),
      23: require('./minna/vi/23'),
      24: require('./minna/vi/24'),
      25: require('./minna/vi/25'),
      26: require('./minna/vi/26'),
      27: require('./minna/vi/27'),
      28: require('./minna/vi/28'),
      29: require('./minna/vi/29'),
      30: require('./minna/vi/30'),
      31: require('./minna/vi/31'),
      32: require('./minna/vi/32'),
      33: require('./minna/vi/33'),
      34: require('./minna/vi/34'),
      35: require('./minna/vi/35'),
      36: require('./minna/vi/36'),
      37: require('./minna/vi/37'),
      38: require('./minna/vi/38'),
      39: require('./minna/vi/39'),
      40: require('./minna/vi/40'),
      41: require('./minna/vi/41'),
      42: require('./minna/vi/42'),
      43: require('./minna/vi/43'),
      44: require('./minna/vi/44'),
      45: require('./minna/vi/45'),
      46: require('./minna/vi/46'),
      47: require('./minna/vi/47'),
      48: require('./minna/vi/48'),
      49: require('./minna/vi/49'),
      50: require('./minna/vi/50'),
    },
  },
  // my: {
  //   minna: {
  //     1: require('./minna/my/1'),
  //   },
  // },
};

console.log('I18n.locale', I18n.locale);

I18n.isZh = I18n.locale.startsWith('zh');
if (I18n.locale.startsWith('zh-Hant')) {
  I18n.translations[I18n.locale] = I18n.translations['zh-Hant'];
} else if (I18n.isZh) {
  I18n.translations[I18n.locale] = I18n.translations.zh;
} else if (I18n.locale.startsWith('vi')) {
  I18n.translations[I18n.locale] = I18n.translations.vi;
}

Tts.voices().then(voices => {
  console.log('Tts voices', voices);
  const matchVoices = voices.filter(i =>
    I18n.locale.split('-')[0].startsWith(i.language.split('-')[0])
  );
  if (matchVoices.length > 0) {
    I18n.voiceLocale = matchVoices[0].language;
  }

  const jpVoices = voices.filter(
    i =>
      ((i.language && i.language.toLowerCase().startsWith('ja')) ||
        (i.name && i.name.toLowerCase().startsWith('ja'))) &&
      i.notInstalled === false
  );
  I18n.isJaVoiceSupport = jpVoices.length > 0;
  console.log('jpVoices', jpVoices, I18n.isJaVoiceSupport);

  console.log('I18n.voiceLocale', I18n.voiceLocale);
});

export default I18n;
