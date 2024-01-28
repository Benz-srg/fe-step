import { persistentAtom } from "@nanostores/persistent";

type TUser = {
  token: string;
  user_type_id: number;
};

export type TAuthStore = {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: TUser | null;
};

export const authStore = persistentAtom<TAuthStore>(
  "authStore",
  { isLoggedIn: false, isInitialized: false, user: null },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
