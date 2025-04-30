import { Curso } from './curso.model'

export class Modulos {
    id: number;  // Identificador numérico
    nombre: string;  // Nombre del ODS
    clases: Curso[];
    eliminado: boolean;
    // Constructor para inicializar la clases
    constructor(id: number, nombre: string, clases: Curso[], eliminado: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.clases = clases;
        this.eliminado = eliminado;
    }
}



