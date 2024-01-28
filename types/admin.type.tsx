export interface IAdmin {
  id: string;
  full_name: string;
  department: string;
  faculty: string;
  email: string;
  phone: string;
  is_active: boolean;
  img_profile: string;
  user_type_id: number;
  created_at: string;
  updated_at: string;
  user_assistant_id: any;
  role: Role;
  type: Type;
}

export interface Role {
  id: number;
  add_researcher: boolean;
  edit_researcher: boolean;
  delete_researcher: boolean;
  reply_researcher: boolean;
  see_of_request: boolean;
  edit_of_request: boolean;
  delete_of_request: boolean;
  add_admin: boolean;
  edit_admin: boolean;
  delete_admin: boolean;
  edit_permission: boolean;
}

export interface Type {
  id: number;
  name: string;
}

export interface IPayloadAdmin {
  full_name: string;
  department: string;
  faculty: string;
  email: string;
  phone: string;
  user_type_id: number;
  password: string;
  role: Role;
}

export interface IPayloadChangePassword {
  password: string;
  old_password: string;
}
