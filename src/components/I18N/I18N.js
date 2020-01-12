import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import languagePack from './languagePack';

export const I18NContext = createContext({
  language: 'default'
});

export function I18N(props) {
  const { children } = props;
  const [language, setLanguage] = useState(typeof window === 'object' ? do {
    const lang = (window.navigator.language || window.navigator.userLanguage).toLocaleLowerCase();

    lang === 'zh-hans-cn' ? 'zh-cn' : lang;
  } : 'default'); // 当前的语言环境

  // 改变语言
  function handleLanguageSelect(value, option) {
    setLanguage(value);
  }

  const contextValue = {
    language,
    onSelect: handleLanguageSelect,
    languagePack: language in languagePack ? languagePack[language] : languagePack.default
  };

  return <I18NContext.Provider value={ contextValue }>{ children }</I18NContext.Provider>;
}

I18N.propTypes = {
  children: PropTypes.node
};