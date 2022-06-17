import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

type DragDropSectionProps = {
  name?: string;
  title?: string;
  multiple?: boolean;
  note?: string;
  types?: string[];
  file: File | File[] | null;
  setFile: React.Dispatch<React.SetStateAction<File | File[] | null>>;
};

const DragDropSection = ({
  name = 'file',
  title = 'Drop your artwork here',
  multiple = false,
  note = 'Allowed all format | Max 1 GB',
  file,
  setFile,
}: DragDropSectionProps) => {
  const handleChange = (file: File[] | File) => {
    setFile(file);
  };

  return (
    <>
      <div className='browse-file-wrapper mb-30 wow fadeInUp'>
        <div className='browse-file-icon'>
          <i className='flaticon-cloud-computing'></i>
        </div>
        <h1 className='browse-file-text'>{title}</h1>
        <FileUploader
          multiple={multiple}
          handleChange={handleChange}
          name={name}
          hoverTitle='Drop here'
        />
        <div className='browse-file-note'>{note}</div>
      </div>
      <p>
        {file
          ? `File name: ${Array.isArray(file) ? file?.[0].name : file.name}`
          : 'no files uploaded yet'}
      </p>
    </>
  );
};

export default DragDropSection;
