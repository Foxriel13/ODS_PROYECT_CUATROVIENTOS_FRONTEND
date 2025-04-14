import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iniciativas } from '../../models/iniciativas.model';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { CommonModule, NgStyle } from '@angular/common';
import { Metas } from '../../models/metas.model';
import { MetasService } from '../../serviceMetas/metas.service';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { IndicadoresService } from '../../serviceIndicadores/indicadores.service';
import { IniciativasPorCurso } from '../../models/indicadores/iniciativasPorCurso';
import { CiclosYModulosConInciativas } from '../../models/indicadores/ciclosYModulosConInciativas';
import { ExplicacionIniciativas } from '../../models/indicadores/explicacionIniciativas';
import { OdsTrabajadosYSusMetas } from '../../models/indicadores/odsTrabajadosYSusMetas';
import { TieneEntidadesExternas } from '../../models/indicadores/tieneEntidadesExternas';
import { TieneRRSS } from '../../models/indicadores/tieneRRSS.model';
import { TipoIniciativa } from '../../models/indicadores/tipoIniciativa';
import { CantIniciativasProfesor } from '../../models/indicadores/cantIniciativasProfesor';
import { DiferenciaInnovadoresYNo } from '../../models/indicadores/diferenciaInnovadoresYNo';
import { CantHorasIniciativa } from '../../models/indicadores/cantHorasIniciativa';
import { HaTendioActividad } from '../../models/indicadores/haTendioActividad';
import {  OnInit } from '@angular/core';


@Component({
  selector: 'app-grafico-indicadores',
  imports: [FormsModule, CommonModule/*, NgStyle*/, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './grafico-indicadores.component.html',
  styleUrl: './grafico-indicadores.component.scss'
})
export class GraficoIndicadoresComponent implements OnInit{
  iniciativas: Iniciativas[] = []
  iniciativasFiltradas: Iniciativas[] = []
  iniciativasTotales: Iniciativas[] = []

  //modulosIniciativa: Modulos[] = []

  metas: Metas[] = [];
  cursos: Curso[] = [];
  anyos_lectivos: string[] = []
  anyo_seleccionado: string = '2024-2025';

  //Indicadores
  iniciativasPorCurso!: IniciativasPorCurso[];
  numeroIniciativas!: number;
  ciclosYModulosConIniciativas!: CiclosYModulosConInciativas[];
  explicacionIniciativas!: ExplicacionIniciativas[];
  odsTrabajadosYSusMetas!: OdsTrabajadosYSusMetas[];
  tieneEntidadesExternas!: TieneEntidadesExternas[];
  tieneRRSS!: TieneRRSS[];
  tipoIniciativa!: TipoIniciativa[];
  // cantProfesores!: number[];
  cantidadProfesores: number = 0;
  cantIniciativaProfesor!: CantIniciativasProfesor[];
  diferenciaInnovadoresYNo!: DiferenciaInnovadoresYNo[];
  cantHorasIniciativa!: CantHorasIniciativa[];
  haTendioActividad!: HaTendioActividad[];


  constructor(
    private iniciativasService: IniciativasService,
    private metasService: MetasService,
    private cursosService: ServiceCursosService,
    private indicadoresService: IndicadoresService) {

  }

  ngOnInit(): void {
    this.iniciativasService.getIniciativas().subscribe((data: Iniciativas[]) => {
      console.log('Iniciativas recibidas:', data);

      this.iniciativasTotales = data;
      this.iniciativas = data.filter(iniciativa => !iniciativa.eliminado);
      this.iniciativasFiltradas = this.iniciativas;

      this.anyos_lectivos = [...new Set(data.map(iniciativa => iniciativa.anyo_lectivo))];

      if (this.anyos_lectivos.length > 0) {
        this.anyo_seleccionado = this.anyos_lectivos[0];
      }
    });

    this.metasService.getMetasList().subscribe((meta: Metas[]) => {
      console.log('Metas recibidas:', meta);
      this.metas = meta;
    });

    this.cursosService.getCursosList().subscribe((curso: Curso[]) => {
      this.cursos = curso;
    });

    // Indicadores
    this.indicadoresService.getIniciativasPorCurso().subscribe(data => {
      this.iniciativasPorCurso = data;
    });

    this.indicadoresService.getCantidadIniciativas().subscribe((data) => {
      this.numeroIniciativas = data.cantidad;
    });

    this.indicadoresService.getCiclosYModulosConIniciativas().subscribe(data => {
      this.ciclosYModulosConIniciativas = data;
    });

    this.indicadoresService.getExplicaciónIniciativas().subscribe(data => {
      this.explicacionIniciativas = data;
    });

    this.indicadoresService.getOdsTrabajadosYSusMetas().subscribe(data => {
      this.odsTrabajadosYSusMetas = data;
    });

    this.indicadoresService.getTieneEntidadesExternas().subscribe(data => {
      this.tieneEntidadesExternas = data;
    });

    this.indicadoresService.getTieneRRSS().subscribe(data => {
      this.tieneRRSS = data;
    });

    this.indicadoresService.getTipoIniciativa().subscribe(data => {
      this.tipoIniciativa = data;
    });

    this.indicadoresService.getCantProfesores().subscribe(data => {
      this.cantidadProfesores = data.cantidad;
    });

    this.indicadoresService.getCantIniciativasProfesor().subscribe(data => {
      this.cantIniciativaProfesor = data;
    });

    this.indicadoresService.getDiferenciaInnovadoresYNo().subscribe(data => {
      this.diferenciaInnovadoresYNo = data;
    });

    this.indicadoresService.getCantHorasIniciativa().subscribe(data => {
      this.cantHorasIniciativa = data;
    });

    this.indicadoresService.getHaTenidoActividad().subscribe(data => {
      this.haTendioActividad = data;
    });
  }

  filterChanges(): void {
    // Filtro por año lectivo (solo si hay algo escrito)
    console.log(this.anyo_seleccionado)
    if (this.anyo_seleccionado && this.anyo_seleccionado.trim() !== '') {
      this.iniciativasFiltradas = this.iniciativas.filter((iniciativa) =>
        iniciativa.anyo_lectivo?.trim().includes(this.anyo_seleccionado.trim())
      );

      console.log(this.iniciativasFiltradas)
    }
  }

  //Charts
  public barChartLegend = true;
  public barChartPlugins = [];

  cursosNombre = this.cursos.map(curso => curso.nombre);

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ["Default"],
    datasets: [
      { data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], label: 'Default A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Default B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  //Para Pruebas
  reiniciarChart() {
    this.barChartData = {
      labels: ["Default"],
      datasets: [
        { data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], label: 'Default A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Default B' }
      ]
    };
  }

  //Indicadores
  chartIndicador1() {

    this.reiniciarChart()

    // Obtener los nombres de los cursos como etiquetas (labels)
    const iniciativasUnicas = this.iniciativasPorCurso.map(ini => ini.nombreCurso);

    // Obtener los valores de iniciativas como un array
    const dataPorCurso = this.iniciativasPorCurso.map(ini => ini.numIniciativas);

    // Estructura para el gráfico
    this.barChartData = {
      labels: iniciativasUnicas,
      datasets: [
        {
          label: 'Número de iniciativas por curso',
          data: dataPorCurso,
        }
      ]
    };
  }

  // En el indicador dos no es necesario usar gráfico porque solo es un número
  getIndicador2(): number {
    if (!isNaN(this.numeroIniciativas)) {
       return this.numeroIniciativas;
    }
    return 0;
  }

  chartIndicador3() {

    this.reiniciarChart()

    this.barChartData = {
      labels: this.ciclosYModulosConIniciativas.map(cymci => cymci.nombre_iniciativa),
      datasets: [
        {
          label: 'Ciclos y modulos por iniciativa',
          data: this.ciclosYModulosConIniciativas.map(cymci => cymci.ciclos.length), // Aquí accedemos correctamente a la longitud del array 'ciclos'
        }
      ]
    };
  }

  // TODO indicador 4
  chartIndicador4() {

  }

  chartIndicador5() {
    this.reiniciarChart()
    //OdsYSusMetas
    this.barChartData = {
      labels: this.odsTrabajadosYSusMetas.map(cymci => cymci.nombre_Iniciativa),
      datasets: [
        {
          label: 'Ciclos y modulos por iniciativa',
          data: this.odsTrabajadosYSusMetas.map(cymci => cymci.ods.length), // Aquí accedemos correctamente a la longitud del array 'ciclos'
        }
      ]
    };
  }

  chartIndicador6() {
    const cantidadTienenEntidadesExternas = this.tieneEntidadesExternas.map(cymci => Number(cymci.tiene_entidades));
    const cantidadNoTienenEntidadesExternas = this.tieneEntidadesExternas.map(cymci => Number(cymci.no_tiene_entidades));
  
    const totalTienen = cantidadTienenEntidadesExternas.reduce((sum, val) => sum + val, 0);
    const totalNoTienen = cantidadNoTienenEntidadesExternas.reduce((sum, val) => sum + val, 0);
  
    const datos = [totalTienen, totalNoTienen];
    alert(datos);
  
    this.barChartData = {
      labels: ['Con Entidades Externas', 'Sin Entidades Externas'],
      datasets: [
        {
          label: 'Colaboración de Entidades Externas',
          data: datos,
        }
      ]
    };
  }
  
  
  
  

  chartIndicador7() {
    this.reiniciarChart()
    //TieneRRSS
  }

  chartIndicador8() {
    this.reiniciarChart()
    //TipoIniciativa

    const tiposUnicos = this.tipoIniciativa.map(ini => ini.tipo);

    const dataPorCurso = this.tipoIniciativa.map(ini => ini.cantidad);

    // Estructura para el gráfico
    this.barChartData = {
      labels: tiposUnicos,
      datasets: [
        {
          label: 'Tipos de iniciativas',
          data: dataPorCurso,
        }
      ]
    };
  }

  chartIndicador10() {
    this.reiniciarChart()
    //CantIniciativasProfesor

    const iniciativsUnicas = this.cantIniciativaProfesor.map(ini => ini.nombre_profesor);

    const dataPorCurso = this.cantIniciativaProfesor.map(ini => ini.cantDeIniciativas);

    // Estructura para el gráfico
    this.barChartData = {
      labels: iniciativsUnicas,
      datasets: [
        {
          label: 'Cantidad de Iniciativas por Profesor',
          data: dataPorCurso,
        }
      ]
    };

  }

  chartIndicador11() {
    this.reiniciarChart()
    //DiferenciaInnovadoresYNo
    this.barChartData = {
      labels: ["Tiene o No Entidades Externas"],
      datasets: [
        { data: this.diferenciaInnovadoresYNo.map(tieneNo => tieneNo.cantidad_innovadoras), label: 'Innovadoras' },
        { data: this.diferenciaInnovadoresYNo.map(tieneNo => tieneNo.cantidad_no_innovadoras), label: 'No Innovadoras' }
      ]
    };
  }

  chartIndicador12() {
    this.reiniciarChart()

    //CantHorasIniciativa

    // Obtener los nombres de los cursos como etiquetas (labels)
    const iniciativsUnicas = this.cantHorasIniciativa.map(ini => ini.nombre_iniciativa);

    // Obtener los valores de iniciativas como un array
    const dataPorCurso = this.cantHorasIniciativa.map(ini => ini.horas_dedicadas);

    // Estructura para el gráfico
    this.barChartData = {
      labels: iniciativsUnicas,
      datasets: [
        {
          label: 'Cantidad de Horas por iniciativas',
          data: dataPorCurso,
        }
      ]
    };
  }

  chartIndicador13() {
    this.reiniciarChart()
    //HaTenidoActividad
    this.barChartData = {
      labels: ["Ha Tenido Actividad"],
      datasets: [
        { data: this.haTendioActividad.map(tieneNo => tieneNo.tiene_actividades), label: 'Si' },
        { data: this.haTendioActividad.map(tieneNo => tieneNo.no_tiene_actividades), label: 'No' }
      ]
    };
  }
}

