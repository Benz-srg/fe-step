import { atom, map } from "nanostores";

export interface TUserOrAdmin {
  id?: string;
  full_name?: string;
  department?: string;
  faculty?: string;
  email?: string;
  phone?: string;
  is_active?: boolean;
  user_type_id?: number;
  created_at?: string;
  updated_at?: string;
  role?: TRole | null;
  type?: TUserType | null;
  img_profile?: string;
}

export interface TRole {
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

export interface TUserType {
  id: number;
  name: string;
}

export const $user = atom<TUserOrAdmin>({});

export function setUser(userPayload: TUserOrAdmin) {
  $user.set({ ...$user.get(), ...userPayload });
}
