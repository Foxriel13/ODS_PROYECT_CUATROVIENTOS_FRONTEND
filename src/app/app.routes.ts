import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';  // Asegúrate de que estos componentes existen
import { IniciativasComponent } from './iniciativas/iniciativas.component';
import { ModificarComponent } from './modificar/modificar.component';
import { LogInComponent } from './log-in/log-in.component';

export const routes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'Iniciativas', component: IniciativasComponent },
    { path: 'Modificar', component: ModificarComponent },
    { path: 'LogIn', component: LogInComponent }
];
