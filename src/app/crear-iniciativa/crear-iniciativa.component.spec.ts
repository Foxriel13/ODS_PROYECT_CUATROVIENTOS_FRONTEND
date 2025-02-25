import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearIniciativaComponent } from './crear-iniciativa.component';

describe('CrearIniciativaComponent', () => {
  let component: CrearIniciativaComponent;
  let fixture: ComponentFixture<CrearIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearIniciativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
