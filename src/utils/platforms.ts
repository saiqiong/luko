import { Dimensions, Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
