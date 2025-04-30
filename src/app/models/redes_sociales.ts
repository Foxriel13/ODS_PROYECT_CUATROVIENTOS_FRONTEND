
export class Redes_Sociales {
    id: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión
    enlace: string; 
    eliminado: boolean;
    // Constructor para inicializar la clase
    constructor(id: number, nombre: string, enlace: string, eliminado: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.enlace = enlace;
        this.eliminado = eliminado
    }
}
