import Roles from './roles';

type User = {
  created_at: string;
  created_by: number;
  email: string;
  id: number;
  identity_card: string;
  identity_card_validation: string;
  ig_username: string;
  is_active: number;
  is_blacklist: number;
  is_verified: number;
  name: string;
  phone: string;
  profile_picture: string;
  role: Roles[];
  updated_at: string;
  updated_by: number | null;
  username: string;
};

export type UserLogin = {
  id: number;
  name: string;
  email: string;
  username: string;
  roles: Roles[];
};

export default User;
