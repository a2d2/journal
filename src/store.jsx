import { proxy } from 'valtio';

const state = proxy({
  current: null,
  intro: true,
  color: '#ccc',
  colors: [
    '#0077C8',
    '#25282A',
    '#F7EA48',
    '#007749',
    '#009639',
    '#BA0C2F',
    '#CE0F69',
    '#6558b1',
    '#3e342f',
    '#ea733d',
    '#002855',
    '#2b2926',
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
});

export { state };
