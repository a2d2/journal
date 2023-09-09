import React from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const selectedMaterialName = snap.selectedMaterialName2;
  const colorPalette = snap.colors1;

  const handleColorClick = (color) => {
    if (selectedMaterialName === 'Material_0') {
      state.selectedColor0 = color;
    } else if (selectedMaterialName === 'Material_2') {
      state.selectedColor2 = color;
    }
  };

  return (
    <div className="color-options">
      {colorPalette.map((color) => (
        <div
          key={color}
          className="circle"
          style={{ background: color }}
          onClick={() => handleColorClick(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
