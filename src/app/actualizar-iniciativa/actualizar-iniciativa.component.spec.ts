import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarIniciativaComponent } from './actualizar-iniciativa.component';

describe('ActualizarIniciativaComponent', () => {
  let component: ActualizarIniciativaComponent;
  let fixture: ComponentFixture<ActualizarIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarIniciativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
