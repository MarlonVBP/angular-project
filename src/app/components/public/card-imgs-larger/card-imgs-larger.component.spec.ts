import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImgsLargerComponent } from './card-imgs-larger.component';

describe('CardImgsLargerComponent', () => {
  let component: CardImgsLargerComponent;
  let fixture: ComponentFixture<CardImgsLargerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardImgsLargerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardImgsLargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
