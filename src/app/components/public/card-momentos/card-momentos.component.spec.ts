import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMomentosComponent } from './card-momentos.component';

describe('CardMomentosComponent', () => {
  let component: CardMomentosComponent;
  let fixture: ComponentFixture<CardMomentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMomentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMomentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
