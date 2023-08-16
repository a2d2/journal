import {
  swatch,
  fileIcon,
  ai,
  logoShirt,
  stylishShirt,
  book,
  monitor,
  notepad,
  download,
} from '../assets';

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: swatch,
  },

  // {
  //   name: 'stylishShirt',
  //   icon: stylishShirt,
  // },
  {
    name: 'filepicker',
    icon: fileIcon,
  },
  // {
  //   name: 'logoShirt',
  //   icon: logoShirt,
  // },
];

export const EditorTabs1 = [
  {
    name: 'book',
    icon: book,
  },
  {
    name: 'monitor',
    icon: monitor,
  },
  {
    name: 'notepad',
    icon: notepad,
  },
];

export const FilterTabs = [
  {
    name: 'logoShirt',
    icon: logoShirt,
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt,
  },
  {
    name: 'download',
    icon: download,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },
};
