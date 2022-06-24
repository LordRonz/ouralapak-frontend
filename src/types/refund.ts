export type Refund = {
  created_at: string;
  created_by: number | null;
  desc: string;
  id: number;
  is_active: number;
  name: string;
  updated_at: string;
  updated_by: number | null;
};

export default Refund;
