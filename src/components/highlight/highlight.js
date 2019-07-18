import hljs from 'highlight.js/lib/highlight';
import jsonLanguages from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', jsonLanguages);

export default hljs;