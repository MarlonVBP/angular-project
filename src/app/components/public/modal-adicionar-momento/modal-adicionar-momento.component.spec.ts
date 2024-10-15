import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarMomentoComponent } from './modal-adicionar-momento.component';

describe('ModalAdicionarMomentoComponent', () => {
  let component: ModalAdicionarMomentoComponent;
  let fixture: ComponentFixture<ModalAdicionarMomentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAdicionarMomentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAdicionarMomentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
