export interface IRegister {
  full_name: string;
  faculty: string;
  department: string;
  phone: string;
  email: string;
  password: string;
  assistant?: {
    full_name?: string;
    phone?: string;
    email?: string;
  };
}
