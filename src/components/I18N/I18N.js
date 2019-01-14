import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import languagePack from './languagePack';

export const I18NContext: Object = createContext({ language: 'default' });

export class I18N extends Component{
  static propTypes: Object = {
    children: PropTypes.node
  };

  state: {
    language: string
  };

  constructor(): void{
    super(...arguments);

    const language: string = typeof window === 'object' ? do{
      (window.navigator.language || window.navigator.userLanguage).toLocaleLowerCase();
    } : 'default';

    this.state = {
      language // 当前的语言环境
    };
  }
  // 改变语言
  handleLanguageSelect: Function = (value: string, option: Object): void=>{
    this.setState({ language: value });
  };
  render(): React.Element{
    const { children }: { children: React.ChildrenArray<React.Node> } = this.props;
    const { language }: { language: string } = this.state;
    const contextValue: Object = {
      language,
      onSelect: this.handleLanguageSelect,
      languagePack: language in languagePack ? languagePack[language] : languagePack.default
    };

    return <I18NContext.Provider value={ contextValue }>{ children }</I18NContext.Provider>;
  }
}