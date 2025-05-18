import { Curso } from './curso.model'

export class Modulos {
    id: number;
    nombre: string;
    clases: Curso[];
    eliminado: boolean;
    
    constructor(id: number, nombre: string, clases: Curso[], eliminado: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.clases = clases;
        this.eliminado = eliminado;
    }
}



