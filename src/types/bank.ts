export type Bank = {
  created_at: string;
  created_by: number | null;
  id: number;
  is_active: boolean;
  name: string;
  rekening_name: string;
  rekening_number: string;
  updated_at: string;
  updated_by: number | null;
};

export default Bank;
