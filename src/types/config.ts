export type Emblem = {
  created_at: string;
  emblem_id: number;
  id: number;
  iklan_id: number;
  level: number;
  updated_at: string;
};

export type Config = {
  created_at: string;
  created_by: number | null;
  id: number;
  key: string;
  updated_at: string;
  updated_by: number | null;
  value: string;
};

export default Config;
