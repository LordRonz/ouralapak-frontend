export const truncateStr = (s?: string, limit = 8) =>
  s ? s.substring(0, limit) + '...' : '...';

export default truncateStr;
