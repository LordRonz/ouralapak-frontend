export type Bank = {
  created_at: string;
  created_by: number | null;
  id: number;
  is_active: number;
  name: string;
  rekening_name: string;
  rekening_number: string;
  updated_at: string;
  updated_by: number | null;
  code: string;
  method: string;
  provider: string | null;
};

export default Bank;
