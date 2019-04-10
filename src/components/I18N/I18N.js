import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import languagePack from './languagePack';

export const I18NContext = createContext({ language: 'default' });

export class I18N extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  constructor() {
    super(...arguments);

    const language = typeof window === 'object'
      ? (window.navigator.language || window.navigator.userLanguage).toLocaleLowerCase()
      : 'default';

    this.state = {
      language // 当前的语言环境
    };
  }
  // 改变语言
  handleLanguageSelect = (value, option) => {
    this.setState({ language: value });
  };
  render() {
    const { children } = this.props;
    const { language } = this.state;
    const contextValue = {
      language,
      onSelect: this.handleLanguageSelect,
      languagePack: language in languagePack ? languagePack[language] : languagePack.default
    };

    return <I18NContext.Provider value={ contextValue }>{ children }</I18NContext.Provider>;
  }
}