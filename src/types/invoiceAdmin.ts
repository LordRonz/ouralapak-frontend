import User from './user';

export type InvoiceAdmin = {
  biaya_admin: number;
  biaya_penjualan: number;
  created_at: string;
  created_by: number;
  expired_at: string;
  email?: string;
  id: number;
  iklan: {
    created_at: string;
    id: number;
    status: number;
    title: string;
    updated_at: string;
  };
  iklan_id: number;
  jenis_invoice: number;
  jenis_pembayaran: {
    id: number;
    name: string;
    rekening_name: string;
    rekening_number: string;
  };
  no_invoice: string;
  phone?: string;
  status: number;
  updated_at: string;
  updated_by: number;
  user_id: number;
  user: User;
};

export default InvoiceAdmin;
