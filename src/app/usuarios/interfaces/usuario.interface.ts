import { Estado } from "./estado.interface";
import { Perfil } from "./perfil.interface";
import { UsuariosAmigos } from "./usuarios_amigos.interface";
import { Noticia } from "src/app/noticias/interfaces/noticia.interface";
import { Login } from "src/app/auth/interfaces/login.interface";
import { EquiposUsuarios } from "src/app/equipos/interfaces/equipos_usuarios.interface";

export interface Usuario extends Login {
  id?: number;
  nick?: string | null;
  email?: string | null;
  activado?: boolean;
  perfil?: Perfil;
  equiposUsuarios?: EquiposUsuarios[] | null;
  noticias?: Noticia[] | null;
  usuariosAmigos?: UsuariosAmigos[] | null;
}

export interface UsuarioRequest {
  nick?: string | null;
  contrasenya?: string | null;
  email?: string | null;
  nombre?: string | null;
  telefono?: string | null;
  nacido?: string | null;
}

export interface Amigo extends Usuario {
  estado?: Estado;
}
