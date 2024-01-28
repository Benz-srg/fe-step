import { persistentAtom } from "@nanostores/persistent";

export type tConfigStore = {
  drawerWidth: number;
};

export const configStore = persistentAtom<tConfigStore>(
  "configStore",
  { drawerWidth: 240 },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
