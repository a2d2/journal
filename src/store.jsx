import { proxy } from 'valtio';

const state = proxy({
  current: null,
  intro: true,
  color: '#ccc',
  colors: [
    '#9E292B',
    '#F4633A',
    '#789d4a',
    '#674736',
    '#2a363f',
    '#48494a',
    '#2b363e',
    '#181917',
    '#000c',
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
