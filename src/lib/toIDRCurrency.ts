export const toIDRCurrency = (num: number | string | undefined) =>
  num
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
        .format(+num)
        .slice(0, -3)
    : num;

export default toIDRCurrency;
