import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIniciativaComponent } from './modal-iniciativa.component';

describe('ModalIniciativaComponent', () => {
  let component: ModalIniciativaComponent;
  let fixture: ComponentFixture<ModalIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalIniciativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
