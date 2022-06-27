export enum StatusIklanEnum {
  DIHAPUS,
  MENUNGGU_PEMBAYARAN,
  MENUNGGU_KONFIRMASI,
  DIPUBLIKASI,
  DITOLAK,
  DIBATALKAN,
  PROSES_REKBER,
  SELESAI,
  MENUNGGU_PEMBAYARAN_PEMBELI,
}

export const getStatusIklan = (status: number | string) => {
  switch (+status) {
    case 0:
      return 'Dihapus';
    case 1:
      return 'Menunggu Pembayaran';
    case 2:
      return 'Menunggu Konfirmasi';
    case 3:
      return 'Dipublikasi';
    case 4:
      return 'Ditolak';
    case 5:
      return 'Dibatalkan';
    case 6:
      return 'Proses Rekber';
    case 7:
      return 'Selesai';
    case 8:
      return 'Menunggu Pembayaran Pembeli';
    default:
      return 'Dihapus';
  }
};

export default getStatusIklan;
