import React from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const selectedMaterialName =
    snap.selectedMaterialName0 || snap.selectedMaterialName2;
  const colorPalette =
    selectedMaterialName === 'Material_2' ? snap.colors1 : snap.colors;

  return (
    <div className="color-options">
      {colorPalette.map((color) => (
        <div
          key={color}
          className="circle"
          style={{ background: color }}
          onClick={() => (state.selectedColor = color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
