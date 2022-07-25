export type FeePayment = {
  id: number;
  id_bank: number;
  type: number;
  fee_flat: number;
  fee_percent: number;
  is_active: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  name: string;
  rekening_number: string | null;
};

export default FeePayment;
