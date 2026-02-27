export interface LoginData {
  email: string;
  password: string;
}

/** Discriminated union that mirrors the actual API response shape from /api/auth/signIn.
 * On success the API returns { success: true, mensaje, usuario }.
 * On failure it returns { success: false, error }.
 */
export type LoginResponse =
  | {
      success: true;
      mensaje: string;
      usuario: {
        id: string;
        email: string;
        ultimo_inicio: string;
      };
    }
  | {
      success: false;
      error: string;
    };