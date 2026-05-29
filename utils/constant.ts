import { Database, LayoutGrid, Lock, LockOpen } from "lucide-react";

export const MAX_SIZE = 10 * 1024 * 1024;

export const OPEN_ROUTE = [
  "/auth/me",
  "/auth/login",
  "/auth/logout",
  "/auth/refresh",
  "/auth/register",
];

export const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export const NAV_LINKS = [
  { text: "Dash_board", path: "/", icon: LayoutGrid },
  { text: "Encode_Message", path: "/encode", icon: Lock },
  { text: "Decode_Message", path: "/decode", icon: LockOpen },
  { text: "Vault_Archive", path: "/archive", icon: Database },
];

export const FOOTER_LINKS = [
  { text: "Encryption_Docs", path: "/" },
  { text: "Api_Access", path: "/encode" },
];
