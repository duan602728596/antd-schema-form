import hljs from 'highlight.js/lib/core';
import jsonLanguages from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', jsonLanguages);

export default hljs;