import type Emblem from './emblem';
import type Hero from './hero';
import type SkinRare from './skinRare';
import type User from './user';

type Iklan = {
  change_name_status: number;
  created_at: string;
  created_by: string;
  emblems: Emblem[];
  first_top_up_exist: null;
  first_top_up_image: null;
  harga_akun: string;
  hero: Hero[];
  id: number;
  image_emblem: string;
  image_profile: string;
  image_skin: string[];
  image_win_rate: string;
  image_win_rate_hero: string;
  jenis_refund: number;
  package_id: number;
  platform_id: number;
  recall_effect: string[];
  status: string;
  title: string;
  total_hero: number;
  total_skin: number;
  total_skin_rare: SkinRare[];
  updated_at: string;
  updated_by: number;
  user: User;
  user_id: number;
  win_rate: number;
};

export default Iklan;
