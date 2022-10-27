export enum JenisInvoice {
  PENJUAL = 1,
  PEMBELI,
}

export enum StatusInvoice {
  MENUNGGU_PEMBAYARAN,
  SUDAH_DIBAYAR,
  EXPIRED,
}

export const getStatusInvoice = (s: number | string) => {
  switch (+s) {
    case StatusInvoice.MENUNGGU_PEMBAYARAN: {
      return 'Menunggu Pembayaran';
    }
    case StatusInvoice.SUDAH_DIBAYAR: {
      return 'Sudah Dibayar';
    }
    case StatusInvoice.EXPIRED: {
      return 'Expired';
    }
  }
};

type Invoice = {
  biaya_admin: number;
  biaya_penjualan: number;
  biaya_rekber: number;
  created_at: string;
  created_by: string;
  expired_at: string;
  email: string;
  harga_akun: string;
  title: string;
  jenis_refund: string;
  name: string;
  phone: string;
  id: number;
  iklan_id: number;
  kode_unik: number;
  jenis_invoice: JenisInvoice;
  jenis_pembayaran: {
    created_at: string;
    created_by: string | null;
    id: number;
    is_active: number;
    name: string;
    rekening_name: string;
    rekening_number: string;
    updated_at: string;
    updated_by: string;
  };
  nama_penjual: string;
  no_invoice: string;
  package: string;
  package_id: number;
  status: number;
  updated_at: string;
  updated_by: number;
  user_id: number;
  win_rate: number;
  va: null | string;
  qris: null | string;
};

export type InvoicePembeli = {
  bank: {
    id: number;
    name: string;
    rekening_name: string;
    rekening_number: string;
  };
  biaya_admin: number;
  biaya_penjualan: number;
  biaya_rekber: number;
  created_at: string;
  expired_at: string;
  id: number;
  iklan_id: number;
  jenis_invoice: JenisInvoice;
  jenis_pembayaran: number;
  nama_penjual: string;
  no_invoice: string;
  status: number;
  updated_at: string;
  user_id: number;
  win_rate: number;
  va: null | string;
  qris: null | string;
};

export default Invoice;
