import { CameraOptions } from 'react-native-image-picker/src';

const DEFAULT_OPTIONS: CameraOptions = {
  mediaType: 'photo',
  videoQuality: 'high',
  quality: 1,
  includeBase64: false,
  saveToPhotos: false,
  durationLimit: 0,
};

const VIDEO_OPTIONS: CameraOptions = {
  mediaType: 'video',
  videoQuality: 'high',
  quality: 1,
  includeBase64: false,
  saveToPhotos: false,
};

export { DEFAULT_OPTIONS, VIDEO_OPTIONS };
