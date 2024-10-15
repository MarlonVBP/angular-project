import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImgsSmallComponent } from './card-imgs-small.component';

describe('CardImgsSmallComponent', () => {
  let component: CardImgsSmallComponent;
  let fixture: ComponentFixture<CardImgsSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardImgsSmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardImgsSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
