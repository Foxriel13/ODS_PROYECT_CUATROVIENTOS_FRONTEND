import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorEntidadesComponent } from './administrador-entidades.component';

describe('AdministradorEntidadesComponent', () => {
  let component: AdministradorEntidadesComponent;
  let fixture: ComponentFixture<AdministradorEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorEntidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
