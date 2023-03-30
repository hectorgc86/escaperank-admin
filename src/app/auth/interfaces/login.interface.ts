import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface Login {
  usuarioId?: string | null;
  tipoToken?: string | null;
  expiraEn?: string | null;
  tokenAcceso?: string | null;
}

export interface LoginRequest extends Request {
  usuario?: string | null | JwtPayload;
  contrasenya?: string | null;
  token?: string | null;
}
