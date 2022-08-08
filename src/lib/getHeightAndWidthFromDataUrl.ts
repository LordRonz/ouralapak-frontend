export const getHeightAndWidthFromDataUrl = (
  dataURL: string,
  revoke?: boolean
) =>
  new Promise<{ height: number; width: number }>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
      revoke && URL.revokeObjectURL(dataURL);
    };
    img.src = dataURL;
  });

export default getHeightAndWidthFromDataUrl;
