import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarIniciativaComponent } from './eliminar-iniciativa.component';

describe('EliminarIniciativaComponent', () => {
  let component: EliminarIniciativaComponent;
  let fixture: ComponentFixture<EliminarIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarIniciativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
