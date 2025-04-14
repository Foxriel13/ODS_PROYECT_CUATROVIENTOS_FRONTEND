import { Curso } from "../curso.model";

export class CiclosYModulosConIniciativas{
    id: number;
    nombre_iniciativa: string;
    ciclos: Curso[];

    constructor(id: number, nombre_iniciativa: string, ciclos: Curso[]){
        this.id = id
        this.nombre_iniciativa = nombre_iniciativa
        this.ciclos = ciclos
    }
}