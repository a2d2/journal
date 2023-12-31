import React from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/svg+xml, image/png, image/jpeg" // Acepta solo archivos SVG
          // accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          SELECT FILE
        </label>
        <p className="mt-2 text-black-900 text-md truncate">
          {' '}
          {file === '' ? (
            <>
              File type accepted: <br />
              svg+xml, png, jpg
            </>
          ) : (
            file.name
          )}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="ADD IMAGE TO MODEL"
          handleClick={() => readFile('logo')}
          customStyles="bg-custom-green text-xs"
        />
        {/* <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        /> */}
      </div>
    </div>
  );
};
export default FilePicker;
