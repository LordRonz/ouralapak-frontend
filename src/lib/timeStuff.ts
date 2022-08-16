import { Duration, intervalToDuration } from 'date-fns';

export const calculateTimeLeft = (endDate: Date) => {
  try {
    return intervalToDuration({
      start: new Date(),
      end: endDate,
    });
    // eslint-disable-next-line no-empty
  } catch {
    return {} as Duration;
  }
};
