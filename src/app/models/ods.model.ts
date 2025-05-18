export class Ods {
    idOds: number;
    nombre: string;
    dimension: string;
    eliminado: boolean;
    
    constructor(idOds: number, nombre: string, dimension: string, eliminado: boolean) {
        this.idOds = idOds;
        this.nombre = nombre;
        this.dimension = dimension;
        this.eliminado = eliminado;
    }
}
