import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-navbar-form-crear',
  imports: [CommonModule],
  templateUrl: './navbar-form-crear.component.html',
  styleUrls: ['./navbar-form-crear.component.scss']
})
export class NavbarFormCrearComponent {
  // Variable que mantiene la pestaña activa
  activeTab: string = 'iniciativas';

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
