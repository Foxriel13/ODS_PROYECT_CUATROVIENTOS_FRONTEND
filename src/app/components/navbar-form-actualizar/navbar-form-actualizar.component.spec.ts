import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFormActualizarComponent } from './navbar-form-actualizar.component';

describe('NavbarFormActualizarComponent', () => {
  let component: NavbarFormActualizarComponent;
  let fixture: ComponentFixture<NavbarFormActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFormActualizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFormActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
