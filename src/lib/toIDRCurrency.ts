export const toIDRCurrency = (num: number | string | undefined) =>
  num
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(+num)
    : num;

export default toIDRCurrency;
