export type AuthState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    custom?: string[];
  },
  message?: string;
  success: boolean | null;
  name?: string,
  userId?: number,
}