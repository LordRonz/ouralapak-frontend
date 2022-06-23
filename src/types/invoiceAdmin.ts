import User from './user';

export type InvoiceAdmin = {
  biaya_admin: number;
  biaya_penjualan: number;
  created_at: string;
  created_by: number;
  expired_at: string;
  id: number;
  iklan_id: number;
  jenis_invoice: number;
  jenis_pembayaran: number;
  no_invoice: string;
  status: number;
  updated_at: string;
  updated_by: number;
  user_id: number;
  user: User;
};

export default InvoiceAdmin;
