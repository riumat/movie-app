export type SessionData = {
  user: {
    id: number;
    name: string;
  },
  expires: Date;
  iat: number;
  exp: number;
}