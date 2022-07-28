import Resizer from 'react-image-file-resizer';

export const resizeFile = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  compressFormat: string,
  quality: number,
  rotation: number,
  outputType?: string | undefined,
  minWidth?: number | undefined,
  minHeight?: number | undefined
) =>
  new Promise<string | File | Blob | ProgressEvent<FileReader>>((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      (uri) => resolve(uri),
      outputType,
      minWidth,
      minHeight
    );
  });

export default resizeFile;
