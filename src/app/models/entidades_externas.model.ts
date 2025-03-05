export class entidades_externas {
    id: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión

    // Constructor para inicializar la clase
    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }
}
