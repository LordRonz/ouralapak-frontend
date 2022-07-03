export enum JenisInvoice {
  PENJUAL = 1,
  PEMBELI,
}

export enum StatusInvoice {
  MENUNGGU_PEMBAYARAN,
  SUDAH_DIBAYAR,
}

type Invoice = {
  biaya_admin: number;
  biaya_penjualan: number;
  created_at: string;
  created_by: string;
  expired_at: string;
  id: number;
  iklan_id: number;
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
  no_invoice: string;
  status: number;
  updated_at: string;
  updated_by: number;
  user_id: number;
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
  created_at: string;
  expired_at: string;
  id: number;
  iklan_id: number;
  jenis_invoice: JenisInvoice;
  jenis_pembayaran: number;
  no_invoice: string;
  status: number;
  updated_at: string;
  user_id: number;
};

export default Invoice;
