import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-navbar-form-crear',
  imports: [CommonModule],
  templateUrl: './navbar-form-crear.component.html',
  styleUrls: ['./navbar-form-crear.component.scss']
})
export class NavbarFormCrearComponent {
  @Input() tabsEnabled: boolean[] = [true, false, false, false, false, false, false]; // Estado de los tabs
  @Output() tabChange = new EventEmitter<string>();

  tabs: string[] = ['Iniciativas', 'metas', 'Modulos', 'Profesores', 'Entidades', 'Redes', 'Actividades'];
  activeTab: string = 'Iniciativas';

  onTabClick(tab: string): void {
    const tabIndex = this.tabs.indexOf(tab);
    if (this.tabsEnabled[tabIndex]) {
      this.activeTab = tab;
      this.tabChange.emit(tab);
    }
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
