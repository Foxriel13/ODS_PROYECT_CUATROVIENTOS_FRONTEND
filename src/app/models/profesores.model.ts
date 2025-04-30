
export class Profesores {
    id: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión
    eliminado: boolean

    // Constructor para inicializar la clase
    constructor(id: number, nombre: string, eliminado: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.eliminado = eliminado
    }
}
