import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Iniciativas } from '../../models/iniciativas.model';
import { IniciativasService } from '../../services/sercvicieIniciativasMostrar/iniciativas.service';
import { tap } from 'rxjs';
import { CommonModule, NgStyle } from '@angular/common';
import { Metas } from '../../models/metas.model';
import { MetasService } from '../../services/serviceMetas/metas.service';
import { Meta } from '@angular/platform-browser';
import { Modulos } from '../../models/modulos.model';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import { ServiceCursosService } from '../../services/serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { IndicadoresService } from '../../services/serviceIndicadores/indicadores.service';
import { IniciativasPorCurso } from '../../models/indicadores/iniciativasPorCurso.model';
import { CiclosYModulosConIniciativas } from '../../models/indicadores/ciclosYModulosConIniciativas.model';
import { ExplicacionIniciativas } from '../../models/indicadores/explicacionIniciativas.model';
import { OdsTrabajadosYSusMetas } from '../../models/indicadores/odsTrabajadosYSusMetas.model';
import { TieneEntidadesExternas } from '../../models/indicadores/tieneEntidadesExternas.model';
import { TieneRRSS } from '../../models/indicadores/tieneRRSS.model';
import { TipoIniciativa } from '../../models/indicadores/tipoIniciativa.model';
import { CantIniciativasProfesor } from '../../models/indicadores/cantIniciativasProfesor.model';
import { DiferenciaInnovadoresYNo } from '../../models/indicadores/diferenciaInnovadoresYNo.model';
import { CantHorasIniciativa } from '../../models/indicadores/cantHorasIniciativa.model';
import { HaTenidoActividad } from '../../models/indicadores/haTenidoActividad.model';
import {  OnInit } from '@angular/core';


@Component({
  selector: 'app-grafico-indicadores',
  imports: [FormsModule, CommonModule/*, NgStyle*/, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './grafico-indicadores.component.html',
  styleUrl: './grafico-indicadores.component.scss'
})
export class GraficoIndicadoresComponent implements OnInit{
  public pieChartDataIndicador!: ChartConfiguration<'pie'>['data'];
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = this.getDefaultPieChartOptions();


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
  ciclosYModulosConIniciativas!: CiclosYModulosConIniciativas[];
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
  haTendioActividad!: HaTenidoActividad[];


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

    this.indicadoresService.getCantidadIniciativas().subscribe(data => {
      this.numeroIniciativas = data;
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
      if (data && data.length > 0) {
        this.diferenciaInnovadoresYNo = data; 
        this.chartIndicador11(); 
      } else {
        console.error('No se recibieron datos válidos para el Indicador 11');
      }
    });

    this.indicadoresService.getCantHorasIniciativa().subscribe(data => {
      this.cantHorasIniciativa = data;
    });

    this.indicadoresService.getHaTenidoActividad().subscribe(data => {
      console.log(data)
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

  //Charts BARRA
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

  //Charts TIPO PIE
  // Gráfico de pie para el Indicador 11
  private getDefaultPieChartOptions(): ChartConfiguration<'pie'>['options'] {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };
  }

  private createPieChartData(labels: string[], data: number[], backgroundColors: string[], hoverColors: string[]): ChartConfiguration<'pie'>['data'] {
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverColors,
        },
      ],
    };
  }


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
    const iniciativasUnicas = this.iniciativasPorCurso.map(ini => ini.nombreCurso);
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
       return this.numeroIniciativas; // Devuelve el primer elemento del array
    }
    return 0; // Devuelve un objeto con cantidad 0 si no hay datos
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

  chartIndicador4() {
    this.reiniciarChart()
    /* 
        // Obtener los nombres de los cursos como etiquetas (labels)
        const iniciativasUnicas = this.explicacionIniciativas.map(ini => ini.explicacion);
    
        // Obtener los valores de iniciativas como un array
        const dataPorCurso = this.explicacionIniciativas.map(ini => ini.nombre);
    
        // Estructura para el gráfico
        this.barChartData = {
          labels: iniciativasUnicas,
          datasets: [
            {
              label: 'Número de iniciativas por curso',
              data: dataPorCurso,
            }
          ]
        }; */
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
    this.reiniciarChart()
    //TieneEntidadesExternas
    this.barChartData = {
      labels: ["Tiene o No Entidades Externas"],
      datasets: [
        { data: this.tieneEntidadesExternas.map(tieneNo => tieneNo.tiene_entidades), label: 'Tiene' },
        { data: this.tieneEntidadesExternas.map(tieneNo => tieneNo.no_tiene_entidades), label: 'No Tiene' }
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


  chartIndicador11(): void {
    const labels = ['Innovadoras', 'No Innovadoras'];
    const data = [
      this.diferenciaInnovadoresYNo[0].cantidad_innovadoras,
      this.diferenciaInnovadoresYNo[0].cantidad_no_innovadoras,
    ];
    const backgroundColors = ['#A8D5BA', '#F9C6C9'];
    const hoverColors = ['#C3E6CD', '#FADADD'];

    this.pieChartDataIndicador = this.createPieChartData(labels, data, backgroundColors, hoverColors);
  }
  chartIndicador12(): void {
    const labels = this.cantHorasIniciativa.map(ini => ini.nombre_iniciativa);
    const data = this.cantHorasIniciativa.map(ini => ini.horas_dedicadas);
    const backgroundColors = ['#FFD1DC', '#FFB6C1', '#FFC0CB', '#D1C4E9', '#B3E5FC'];
    const hoverColors = ['#FFE4E1', '#FFCCCB', '#FFDDDD', '#E1D5F5', '#C5F1FF'];

    this.pieChartDataIndicador = this.createPieChartData(labels, data, backgroundColors, hoverColors);
  }
  

  chartIndicador13(): void {
    const labels = ['Ha tenido actividad', 'No ha tenido actividad'];
    const data = [
      this.haTendioActividad[0].tiene_actividades,
      this.haTendioActividad[0].no_tiene_actividades,
    ];
    const backgroundColors = ['#A8D5BA', '#F9C6C9'];
    const hoverColors = ['#C3E6CD', '#FADADD'];

    this.pieChartDataIndicador = this.createPieChartData(labels, data, backgroundColors, hoverColors);
  }
}

