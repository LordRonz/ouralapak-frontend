import queryString from 'query-string';

export const getWaLink = (phone: string, text?: string) =>
  queryString.stringifyUrl({
    url: `https://wa.me/${phone
      .replaceAll('+', '')
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll('-', '')}`,
    query: {
      text,
    },
  });

export default getWaLink;
