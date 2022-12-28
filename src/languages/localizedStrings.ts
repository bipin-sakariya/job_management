import LocalizedStrings from 'react-native-localization';
import { eng } from './en';
// import { hebrew } from './hebrew';
import hebrew from '../translations/Hebrew.json';

export let strings = new LocalizedStrings({
    // en: eng,
    hebrew: hebrew,
});