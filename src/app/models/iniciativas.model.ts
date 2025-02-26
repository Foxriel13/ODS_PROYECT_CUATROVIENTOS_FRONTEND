export class Iniciativas {
    id: number;
    titulo: string;
    contratante: string;
    equipoEducativo: string;
    fechaInicio: string;
    fechaFin: string;
    cursos: string[];
    modulos: string[];
    metas: string[];
    producto: string;
    imagenUrl: string;  // Añadir la propiedad imagenUrl

    // Constructor que recibe todos los parámetros necesarios
    constructor(
        id: number,
        titulo: string,
        contratante: string,
        equipoEducativo: string,
        fechaInicio: string,
        fechaFin: string,
        cursos: string[],
        modulos: string[],
        metas: string[],
        producto: string,
        imagenUrl: string  // Añadir imagenUrl al constructor
    ) {
        this.id = id;
        this.titulo = titulo;
        this.contratante = contratante;
        this.equipoEducativo = equipoEducativo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cursos = cursos;
        this.modulos = modulos;
        this.metas = metas;
        this.producto = producto;
        this.imagenUrl = imagenUrl;  // Asignar imagenUrl
    }
}
