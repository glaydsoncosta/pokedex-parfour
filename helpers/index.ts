import { Dimensions, PixelRatio, Platform } from 'react-native';

export function widthPercentToDP(widthPercent: string) {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
}

export function heightPercentToDP(heightPercent: string) {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
}

export function getDeviceHeight() {
  return Dimensions.get('window').height;
}

export function getDeviceWidth() {
  return Dimensions.get('window').width;
}

export function testID(id: string | undefined) {
  return Platform.OS === 'android'
    ? {
        accessible: true,
        accessibilityLabel: id
      }
    : {
        testID: id
      };
}

export function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
};