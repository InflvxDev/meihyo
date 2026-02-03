export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  usuario: {
    id: string;
    email: string;
    ultimo_inicio: string;
  };
  error?: string;
}