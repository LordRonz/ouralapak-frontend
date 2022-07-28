export const dataURLtoFile = async (dataurl: string, filename: string) => {
  const arr = dataurl.split(','),
    mime = (arr[0].match(/:(.*?);/) as string[])[1];

  const blob = await (await fetch(dataurl)).blob();

  return new File([blob], filename, { type: mime });
};

export default dataURLtoFile;
