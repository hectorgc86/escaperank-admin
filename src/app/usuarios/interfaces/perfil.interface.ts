import { Usuario } from './usuario.interface';

export interface Perfil {
  id?: number;
  nombre?: string | null;
  nacido?: string | null;
  telefono?: string | null;
  avatar?: string | null;
  numeroPartidas?: number | null;
  partidasGanadas?: number | null;
  partidasPerdidas?: number | null;
  usuarioId?: number;
  usuario?: Usuario;
}

export interface PerfilRequest {
  nombre?: string | null;
  telefono?: string | null;
  numeroPartidas?: number | null;
  partidasGanadas?: number | null;
  partidasPerdidas?: number | null;
  avatar?: string | null;
  nacido?: string | null;
  usuarioId?: number;
}
