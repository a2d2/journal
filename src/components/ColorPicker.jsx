import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  const colors = [
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
  ];
  return (
    <div className="color-options">
      {colors.map((color) => (
        <div
          key={color}
          className="circle"
          style={{ background: color }}
          onClick={() => (state.selectedColor = color)}
        ></div>
      ))}
    </div>
    // <div className="absolute left-full ml-3">
    //   <SketchPicker
    //     color={snap.color}
    //     disableAlpha
    //     // presetColors={['#00000', '#fffff', '#00ff00', '#0000ff']}
    //     onChange={(color) => (state.color = color.hex)}
    //   />
    // </div>
  );
};
export default ColorPicker;
