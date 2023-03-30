export interface LoginResponse {
  expires: number;
  accessToken: string;
  usuarioId: string;
}

export interface RegisterResponse {
  email: string;
}

export interface TokenResponse {
  accessToken: string;
}
