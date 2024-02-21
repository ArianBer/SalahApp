import {en, al, ar, tr} from './languages';
import {I18n} from 'i18n-js';

const i18n = new I18n({en, al, ar, tr});
i18n.fallbacks = true;

export default i18n;