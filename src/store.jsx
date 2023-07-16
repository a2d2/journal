import { proxy } from 'valtio';

const state = proxy({
  current: null,
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['wall', 'three2', '223'],
  selectedColor: '#EFBD4E',
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
});

export { state };
