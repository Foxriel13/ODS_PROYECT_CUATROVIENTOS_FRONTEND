
export class Redes_Sociales {
    id: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión
    enlace: string; 

    // Constructor para inicializar la clase
    constructor(id: number, nombre: string, enlace: string) {
        this.id = id;
        this.nombre = nombre;
        this.enlace = enlace;
    }
}
