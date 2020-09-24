import { Usuario } from '../models/usuario.model';

export interface CargarUsuario {
    registros: number;
    usuarios: Usuario[];
}