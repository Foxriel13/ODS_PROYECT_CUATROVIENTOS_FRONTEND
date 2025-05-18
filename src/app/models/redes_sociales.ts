export class Redes_Sociales {
    id: number;
    nombre: string;
    enlace: string; 
    eliminado: boolean;
    
    constructor(id: number, nombre: string, enlace: string, eliminado: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.enlace = enlace;
        this.eliminado = eliminado
    }
}
