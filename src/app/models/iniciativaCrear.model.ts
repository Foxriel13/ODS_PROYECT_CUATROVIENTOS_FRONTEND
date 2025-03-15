export class IniciativasCrear {
    id: number;
    tipo: string;
    horas: number;
    nombre: string;
    explicacion: string;
    redes_sociales: string;
    fecha_registro: string;
    fecha_inicio: string;
    fecha_fin: string;
    anyo_lectivo: string;
    eliminado: boolean;
    innovador: boolean;
    imagen: string;
    mas_comentarios: string;
    metas: number[];  // Solo ids de metas
    profesores: number[];  // Solo ids de profesores
    entidades_Externas: number[];  // Solo ids de entidades externas
    modulos: number[];  // Solo ids de módulos

    // Constructor para inicializar la clase
    constructor(
        id: number,
        tipo: string,
        horas: number,
        nombre: string,
        explicacion: string,
        redes_sociales: string,
        fecha_registro: string,
        fecha_inicio: string,
        fecha_fin: string,
        anyo_lectivo: string,
        eliminado: boolean,
        imagen: string,
        mas_comentarios:string,
        metas: number[],  // Ahora es un array de ids
        profesores: number[],  // Ahora es un array de ids
        entidades_Externas: number[],  // Ahora es un array de ids
        modulos: number[],  // Ahora es un array de ids
        innovador: boolean  // Se añade el parámetro 'innovador'
    ) {
        this.id = id;
        this.tipo = tipo;
        this.horas = horas;
        this.nombre = nombre;
        this.explicacion = explicacion;
        this.redes_sociales = redes_sociales;
        this.fecha_registro = fecha_registro;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.anyo_lectivo = anyo_lectivo;
        this.eliminado = eliminado;
        this.imagen = imagen;
        this.mas_comentarios = mas_comentarios;
        this.metas = metas;
        this.profesores = profesores;
        this.entidades_Externas = entidades_Externas;
        this.modulos = modulos;
        this.innovador = innovador;
    }
}
