export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

/** Discriminated union that mirrors the actual API response shape from /api/auth/signUp.
 * On success the API returns { success: true, mensaje, usuario }.
 * On failure it returns { success: false, error }.
 */
export type SignUpResponse =
  | {
      success: true;
      mensaje: string;
      usuario: {
        id: string;
        email: string;
      };
    }
  | {
      success: false;
      error: string;
    };
