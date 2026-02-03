export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  mensaje: string;
  usuario: {
    id: string;
    email: string;
  };
  error?: string;
}