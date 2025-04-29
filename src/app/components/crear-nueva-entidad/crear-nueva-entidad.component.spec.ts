import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNuevaEntidadComponent } from './crear-nueva-entidad.component';

describe('CrearNuevaEntidadComponent', () => {
  let component: CrearNuevaEntidadComponent;
  let fixture: ComponentFixture<CrearNuevaEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearNuevaEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNuevaEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
