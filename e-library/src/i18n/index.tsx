import _get from 'lodash/get';
import { setLocale as setYupLocale } from 'yup';
import Language from '../interfaces/i18n';

let currentLanguageCode = '';

const languages: Language = {
  al: {
    id: 'al',
    label: 'Shqip',
    dateFns: null,
    dictionary: null,
  },
};

export async function init() {
  currentLanguageCode = localStorage.getItem('language') || 'al';
  setLanguageCode(currentLanguageCode);

  if (currentLanguageCode === 'al') {
    await initEn();
  }
}

async function initEn() {
  const language = languages['al'];

  language.dictionary = (await import('./al')).default;

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

export function getLanguage() {
  return languages[getLanguageCode()];
}

function format(message: any, args: any) {
  if (!message) {
    return null;
  }

  try {
    return message.replace(/{(\d+)}/g, function (match: any, number: any) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  } catch (error) {
    throw error;
  }
}

export function getLanguages() {
  return Object.keys(languages).map(language => {
    return languages[language];
  });
}

export function getLanguageCode() {
  return currentLanguageCode;
}

export function setLanguageCode(arg: any) {
  if (!languages[arg]) {
    throw new Error(`Invalid language ${arg}.`);
  }

  localStorage.setItem('language', arg);
}

export function i18nExists(key: any) {
  if (!getLanguage()) {
    return false;
  }

  const message = _get(getLanguage().dictionary, key);
  return Boolean(message);
}

export function i18n(key: any, ...args: any) {
  if (!getLanguage()) {
    return key;
  }

  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}

export function i18nHtml(key: any, ...args: any) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: i18n(key, ...args),
      }}
    />
  );
}
