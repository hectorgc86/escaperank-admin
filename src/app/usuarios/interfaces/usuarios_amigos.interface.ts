import { Estado } from './estado.interface';
import { Usuario } from './usuario.interface';

export interface UsuariosAmigos {
  usuarioId?: number;
  amigoId?: number;
  estado?: Estado;
  amigo?: Usuario;
  usuario?: Usuario;
}
