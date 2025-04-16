import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarModificarEntidadesComponent } from './nav-bar-modificar-entidades.component';

describe('NavBarModificarEntidadesComponent', () => {
  let component: NavBarModificarEntidadesComponent;
  let fixture: ComponentFixture<NavBarModificarEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarModificarEntidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarModificarEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
