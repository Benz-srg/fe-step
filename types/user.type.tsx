export interface IUserlist {
  id: string;
  full_name: string;
  department: string;
  faculty: string;
  email: string;
  phone: string;
  user_assisant_id: number;
  user_assisant: any;
  created_at: string;
  img_profile: string;
}

interface UserAssisant {
  id: number;
  full_name: string;
  email: string;
  phone: string;
}
