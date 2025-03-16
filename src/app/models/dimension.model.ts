// src/app/models/dimension.model.ts

export class Dimension {
    id: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión

    // Constructor para inicializar la clase
    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }
}
