export type MessageTemplate = {
  created_at: string;
  created_by: number | null;
  id: number;
  is_active: number;
  message: string;
  title: string;
  updated_at: string;
  updated_by: number | null;
};

export default MessageTemplate;
