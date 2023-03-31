import { Usuario } from 'src/app/usuarios/interfaces/usuario.interface';
import { Equipo } from './equipo.interface';

export interface EquiposUsuarios {
  equipoId?: number;
  usuarioId?: number;
  equipo?: Equipo;
  usuario?: Usuario;
}
