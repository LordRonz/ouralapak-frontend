export const getEpochSecond = (time: Date) => Math.round(time.getTime() / 1000);

export default getEpochSecond;
