import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-nav-bar-modificar-entidades',
  imports: [CommonModule],
  templateUrl: './nav-bar-modificar-entidades.component.html',
  styleUrl: './nav-bar-modificar-entidades.component.scss'
})
export class NavBarModificarEntidadesComponent {
  activeTab: string = 'actividades';

  @Output() tabChange = new EventEmitter<string>();

  // Método para emitir el cambio de sección
  onTabClick(tab: string): void {
    this.activeTab = tab;  // Actualizar la pestaña activa
    this.tabChange.emit(tab); // Emitir el nombre de la pestaña seleccionada
  }

  // Método para verificar si la pestaña es la activa
  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
