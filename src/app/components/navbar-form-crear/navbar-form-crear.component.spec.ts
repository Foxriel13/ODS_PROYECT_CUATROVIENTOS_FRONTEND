import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFormCrearComponent } from './navbar-form-crear.component';

describe('NavbarFormCrearComponent', () => {
  let component: NavbarFormCrearComponent;
  let fixture: ComponentFixture<NavbarFormCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFormCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFormCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
