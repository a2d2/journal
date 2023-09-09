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
  roundjournal,
  colorpick,
  file1,
  logotshirt1,
} from '../assets';

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: colorpick, //swatch
  },

  {
    name: 'stylishShirt',
    icon: stylishShirt,
  },
  {
    name: 'filepicker',
    icon: file1,
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
    icon: logotshirt1,
  },
  // {
  //   name: 'stylishShirt',
  //   icon: stylishShirt,
  // },
  // {
  //   name: 'download',
  //   icon: download,
  // },
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
