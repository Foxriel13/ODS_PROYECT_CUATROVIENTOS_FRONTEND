import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';  // Asegúrate de que estos componentes existen
import { IniciativasComponent } from './components/iniciativas/iniciativas.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { GraficoIndicadoresComponent } from './components/grafico-indicadores/grafico-indicadores.component';
import { AdministradorEntidadesComponent } from './components/administrador-entidades/administrador-entidades.component';
import { CrearNuevaEntidadComponent } from './components/crear-nueva-entidad/crear-nueva-entidad.component';

export const routes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'Iniciativas', component: IniciativasComponent },
    { path: 'Modificar', component: ModificarComponent },
    { path: 'LogIn', component: LogInComponent },
    { path: 'indicadores', component: GraficoIndicadoresComponent },
    { path: 'AdministradorEntidades', component: AdministradorEntidadesComponent },
    { path: 'CrearEntidadNueva', component: CrearNuevaEntidadComponent }
];
