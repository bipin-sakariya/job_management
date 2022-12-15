import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import 'moment/locale/he'
import moment from 'moment';
import { object } from 'yup';
import { location } from '../types/commanTypes';
import Geocoder from 'react-native-geocoder';


export const pixelRatio = PixelRatio.get();
export const defaultPixel = 2; // provided in design 2px
const fontScale = PixelRatio.getFontScale();
const defaultWidth = 375;
const defaultHeight = 812;

const iPadWidth = 768;
const iPadHeight = 1024;

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

// Ipad
export const scaleIpadWidth = (size: number) =>
  (deviceWidth / iPadWidth) * size;
export const scaleIpadHeight = (size: number) =>
  (deviceHeight / iPadHeight) * size;

export const isNotch =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTV &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896);

/*
 * width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size
 * @returns {number}
 */
export function scaleSize(size: number) {
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  const widthReference = w / defaultWidth;
  const screenRatio = w > h ? h / w : w / h;
  return screenRatio > 0.8 ? size : size * widthReference;
}

/*
 * height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size
 * @returns {number}
 */
export function scaleHeight(size: number) {
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  const widthReference = w / defaultWidth;
  const screenRatio = w > h ? h / w : w / h;
  return screenRatio > 0.8 ? size : size * widthReference;
}

/**
 * @param size  allowFontScaling
 * @returns {Number}
 */
export function scaleFontSize(size: number, allowFontScaling = true): number {
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  const widthReference = w / defaultWidth;
  const screenRatio = w > h ? h / w : w / h;
  const fontSize = allowFontScaling ? 1 : fontScale;
  return screenRatio > 0.8 ? size : (size * widthReference) / fontSize;
}

/**
 * statusbar, react native StatusBar.currentHeight
 * @param ignoreAndroid  return 0 on android if set true
 */
export function getStatusBarHeight(ignoreAndroid = false) {
  return Platform.select({
    ios: isNotch ? 44 : 20,
    android: ignoreAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
}

// /**
//  * deviceHeight
//  */
// export function getAndroidScreenHeight(): number {
//   if (Platform.OS !== 'android') {
//     return deviceHeight;
//   }
//   if (ExtraDimensions.isSoftMenuBarEnabled()) {
//     return deviceHeight - ExtraDimensions.getStatusBarHeight();
//   }
//   return (
//     ExtraDimensions.getRealWindowHeight() -
//     ExtraDimensions.getStatusBarHeight() -
//     ExtraDimensions.getSoftMenuBarHeight()
//   );
// }

export const handleHeight = (value: number): number => {
  return (deviceHeight * value) / defaultHeight;
};

export const isAndroid = (): boolean => Platform.OS === 'android';

export const convertDate = (date: string) => {
  moment.locale('he')
  return moment(date).format('DD MMM YYYY')
}

export function renameKeys(obj: any, newKeys: any) {
  const keyValues = Object.keys(obj).map((key: string) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

export const getAddress = async (location: location) => {
  const res = await Geocoder.geocodePosition({ lat: location?.latitude, lng: location?.longitude }).then((res: any) => {
    console.log("LO", res[0]?.formattedAddress)
    return res[0]?.formattedAddress
  }).catch((err: any) => console.log(err))
  return res
}

