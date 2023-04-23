import { JwtPayload } from "jsonwebtoken";

export interface Login {
  usuarioId?: string | null;
  companyiaId?: string | null;
  rol?: string | null;
  tipoToken?: string | null;
  expiraEn?: string | null;
  tokenAcceso?: string | null;
}

export interface LoginRequest {
  usuario?: string | null | JwtPayload;
  contrasenya?: string | null;
  token?: string | null;
}
