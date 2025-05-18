import { Actividad } from "./actividades.model";
import { entidadesExternas } from "./entidades_externas.model";
import { Metas } from "./metas.model";  // Importar Metas correctamente
import { Modulos } from "./modulos.model";
import { Profesores } from "./profesores.model";
import { Redes_Sociales } from "./redes_sociales";

export class Iniciativas {
    id: number;
    tipo: string;
    horas: number;
    nombre: string;
    explicacion: string;
    fecha_registro: string;
    fecha_inicio: string;
    fecha_fin: string;
    anyo_lectivo : string;
    eliminado: boolean;
    innovador: boolean;
    imagen: string;
    metas: Metas[];
    profesores: Profesores[];
    entidades_externas: entidadesExternas[];
    modulos: Modulos[];
    redes_sociales: Redes_Sociales[];
    actividades: Actividad[];
    mas_comentarios:String;

    constructor(
        id: number,
        tipo: string,
        horas: number,
        nombre: string,
        explicacion: string,
        fecha_registro: string,
        fecha_inicio: string,
        fecha_fin: string,
        anyo_lectivo: string,
        eliminado: boolean,
        imagen: string,
        metas: Metas[],
        profesores: Profesores[],
        entidades_externas: entidadesExternas[],
        modulos: Modulos[],
        redes_sociales: Redes_Sociales[],
        actividades: Actividad[],
        innovador: boolean,
        mas_comentarios:string
    ) {
        this.id = id;
        this.tipo = tipo;
        this.horas = horas;
        this.nombre = nombre;
        this.explicacion = explicacion;
        this.fecha_registro = fecha_registro;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.anyo_lectivo = anyo_lectivo;
        this.eliminado = eliminado;
        this.imagen = imagen;
        this.metas = metas;
        this.profesores = profesores;
        this.entidades_externas = entidades_externas;
        this.modulos = modulos;
        this.redes_sociales = redes_sociales;
        this.actividades = actividades;
        this.innovador = innovador;
        this.mas_comentarios = mas_comentarios;
    }
}
