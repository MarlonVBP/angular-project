import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReceitasComponent } from './modal-receitas.component';

describe('ModalReceitasComponent', () => {
  let component: ModalReceitasComponent;
  let fixture: ComponentFixture<ModalReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
