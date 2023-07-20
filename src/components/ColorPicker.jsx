import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="color-options">
      {snap.colors.map((color) => (
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
