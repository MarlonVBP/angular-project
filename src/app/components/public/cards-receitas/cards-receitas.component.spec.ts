import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsReceitasComponent } from './cards-receitas.component';

describe('CardsReceitasComponent', () => {
  let component: CardsReceitasComponent;
  let fixture: ComponentFixture<CardsReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
