import { proxy } from 'valtio';

const state = proxy({
  current: null,
  intro: true,
  color: '#ccc',
  colors: [
    '#9E292B',
    '#c1320a',
    '#4f6b34',
    '#452f24',
    '#2a363f',
    '#48494a',
    '#283239',
    '#181917',
    '#fdfeff',
  ],
  colors1: ['#cccccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['wall', 'three2', '223'],
  selectedColor: '#ccc',
  selectedDecal: 'three2',
  items: {
    Material_0: '#0000ff',
    Material_1: '#ffffff',
    Material_2: '#ff0000',
  },
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  uploadedFileName: 'abc',
});

export { state };
