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
  imports: [FormsModule, CommonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './grafico-indicadores.component.html',
  styleUrl: './grafico-indicadores.component.scss'
})
export class GraficoIndicadoresComponent implements OnInit{
  public pieChartDataIndicador!: ChartConfiguration<'pie'>['data'];
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = this.getDefaultPieChartOptions();
  public pieChartDataIndicador12!: ChartConfiguration<'pie'>['data'];
  public pieChartDataIndicador13!: ChartConfiguration<'pie'>['data'];
  public pieChartDataIndicador11!: ChartConfiguration<'pie'>['data'];
  public pieChartDataIndicador3!: ChartConfiguration<'pie'>['data'];
  public pieChartDataIndicador5!: ChartConfiguration<'pie'>['data'];

  public barChartData1: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  public barChartData6: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  public barChartData8: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  iniciativas: Iniciativas[] = []
  iniciativasFiltradas: Iniciativas[] = []
  iniciativasTotales: Iniciativas[] = []

  metas: Metas[] = [];
  cursos: Curso[] = [];
  anyos_lectivos: string[] = []
  anyo_seleccionado: string = '2024-2025';


  iniciativasPorCurso!: IniciativasPorCurso[];
  numeroIniciativas: number = 0;
  ciclosYModulosConIniciativas!: CiclosYModulosConIniciativas[];
  explicacionIniciativas!: ExplicacionIniciativas[];
  odsTrabajadosYSusMetas!: OdsTrabajadosYSusMetas[];
  tieneEntidadesExternas!: TieneEntidadesExternas[];
  tieneRRSS!: TieneRRSS[];
  tipoIniciativa!: TipoIniciativa[];
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


    this.indicadoresService.getIniciativasPorCurso().subscribe(data => {
      this.iniciativasPorCurso = data;
      this.chartIndicador1(); 
    });

    this.indicadoresService.getCantidadIniciativas().subscribe(data => {
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
      this.chartIndicador6(); 
    });

    this.indicadoresService.getTieneRRSS().subscribe(data => {
      this.tieneRRSS = data;
    });

    this.indicadoresService.getTipoIniciativa().subscribe(data => {
      this.tipoIniciativa = data;
      this.chartIndicador8();
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
      this.chartIndicador11();
    });

    this.indicadoresService.getCantHorasIniciativa().subscribe(data => {
      this.cantHorasIniciativa = data;
      this.chartIndicador12();
    });

    this.indicadoresService.getHaTenidoActividad().subscribe(data => {
      this.haTendioActividad = data;
      this.chartIndicador13();
    });

    
  }

  filterChanges(): void {

    console.log(this.anyo_seleccionado)
    if (this.anyo_seleccionado && this.anyo_seleccionado.trim() !== '') {
      this.iniciativasFiltradas = this.iniciativas.filter((iniciativa) =>
        iniciativa.anyo_lectivo?.trim().includes(this.anyo_seleccionado.trim())
      );

      console.log(this.iniciativasFiltradas)
    }
  }


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



  reiniciarChart() {
    this.barChartData = {
      labels: ["Default"],
      datasets: [
        { data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], label: 'Default A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Default B' }
      ]
    };
  }


  chartIndicador1() {

    this.reiniciarChart()
    const iniciativasUnicas = this.iniciativasPorCurso.map(ini => ini.nombreCurso);
    const dataPorCurso = this.iniciativasPorCurso.map(ini => ini.numIniciativas);


    this.barChartData1 = {
      labels: iniciativasUnicas,
      datasets: [
        {
          label: 'Número de iniciativas por curso',
          data: dataPorCurso,
          backgroundColor: ['#18eeee', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'],
        }
      ]
    };
  }

  chartIndicador3():void {
    const iniciativasUnicas = this.ciclosYModulosConIniciativas.map(ini => ini.nombre_iniciativa);
    const dataPorCurso = this.ciclosYModulosConIniciativas.map(ini => ini.ciclos.length); // Aquí accedemos correctamente a la longitud del array 'ciclos'
    
    const backgroundColors = ['#A8D5BA', '#F9C6C9'];
    const hoverColors = ['#C3E6CD', '#FADADD'];
  }

  chartIndicador4() {
    this.reiniciarChart()
  }

  chartIndicador5() {
    this.reiniciarChart()

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

    this.barChartData6 = {
      labels: ["Tiene o No Entidades Externas"],
      datasets: [
        {
          data: this.tieneEntidadesExternas.map(tieneNo => tieneNo.tiene_entidades),
          label: 'Tiene',
          backgroundColor: '#64ff55',
        },
        {
          data: this.tieneEntidadesExternas.map(tieneNo => tieneNo.no_tiene_entidades),
          label: 'No Tiene',
          backgroundColor: '#ff9b55',
        },]
    };
  }

  chartIndicador7() {
    this.reiniciarChart()
  }

  chartIndicador8() {
    this.reiniciarChart()

    const tiposUnicos = this.tipoIniciativa.map(ini => ini.tipo);
    const dataPorCurso = this.tipoIniciativa.map(ini => ini.cantidad);


    this.barChartData8 = {
      labels: tiposUnicos,
      datasets: [
        {
          label: 'Tipos de iniciativas',
          data: dataPorCurso,
          backgroundColor: ['#18eeee', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'],
        }
      ]
    };
  }

  chartIndicador10() {
    this.reiniciarChart()

    const iniciativsUnicas = this.cantIniciativaProfesor.map(ini => ini.nombre_profesor);
    const dataPorCurso = this.cantIniciativaProfesor.map(ini => ini.cantDeIniciativas);

    this.barChartData = {
      labels: iniciativsUnicas,
      datasets: [
        {
          label: 'Cantidad de Iniciativas por Profesor',
          data: dataPorCurso,
          backgroundColor: ['#18eeee', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'],
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
    const backgroundColors = ['#d555ff', '#7fff55'];
    const hoverColors = ['#C3E6CD', '#FADADD'];

    this.pieChartDataIndicador11 = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
        borderColor: 'transparent',  
        borderWidth: 0
      }]
    };
  }

  chartIndicador12(): void {
    const labels = this.cantHorasIniciativa.map(ini => ini.nombre_iniciativa);
    const data = this.cantHorasIniciativa.map(ini => ini.horas_dedicadas);
    const backgroundColors = ['#FF5733', '#33FF57', '#33C1FF', '#FF33A8', '#FFFF33']; 
    const hoverColors = ['#FF8A66', '#66FF8A', '#66D4FF', '#FF66C1', '#FFFF66']; 
    this.pieChartDataIndicador12 = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors, 
        borderWidth: 0
      }]
    };
  }

  chartIndicador13(): void {
    const labels = ['Ha tenido actividad', 'No ha tenido actividad'];
    const data = [
      this.haTendioActividad[0].tiene_actividades,
      this.haTendioActividad[0].no_tiene_actividades,
    ];
    const backgroundColors = ['#B5FC23', '#8318ee', '#23FC8F', '#B0FC23'];
    const hoverColors = ['#6A9BCF', '#7A5FBF', '#A87F9D', '#9B6F70'];

    this.pieChartDataIndicador13 = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
        borderColor: 'transparent',  // Aquí quitamos el borde blanco
        borderWidth: 0
      }]
    };
  }
}