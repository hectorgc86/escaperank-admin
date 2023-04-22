import { CompanyiaRequest } from "src/app/salas/interfaces/companyia.interface";
import { UsuarioRequest } from "src/app/usuarios/interfaces/usuario.interface";

export interface Registro {
  usuarioId?: string | null;
  companyiaId?: string | null;
}

export interface RegistroRequest {
  usuario?: UsuarioRequest;
  companyia?: CompanyiaRequest;
}
