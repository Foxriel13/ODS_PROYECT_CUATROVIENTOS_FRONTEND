import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIniciativaComponent } from './card-iniciativa.component';

describe('CardIniciativaComponent', () => {
  let component: CardIniciativaComponent;
  let fixture: ComponentFixture<CardIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardIniciativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
