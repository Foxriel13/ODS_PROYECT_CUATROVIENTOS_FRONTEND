import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-form-actualizar',
  imports: [CommonModule],
  templateUrl: './navbar-form-actualizar.component.html',
  styleUrl: './navbar-form-actualizar.component.scss'
})
export class NavbarFormActualizarComponent {
  activeTab: string = 'iniciativas';

  @Output() tabChange = new EventEmitter<string>();

  onTabClick(tab: string): void {
    this.activeTab = tab; 
    this.tabChange.emit(tab); 
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
