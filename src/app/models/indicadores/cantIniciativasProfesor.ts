// Indicador 10.2

export class CantIniciativasProfesor {
    nombre_profesor: string;
    cantDeIniciativas: number;

    // Constructor para inicializar la clase
    constructor(nombre_profesor: string, cantDeIniciativas: number) {
        this.nombre_profesor = nombre_profesor;
        this.cantDeIniciativas = cantDeIniciativas;
    }
}