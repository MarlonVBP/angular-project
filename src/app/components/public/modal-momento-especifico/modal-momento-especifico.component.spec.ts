import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMomentoEspecificoComponent } from './modal-momento-especifico.component';

describe('ModalMomentoEspecificoComponent', () => {
  let component: ModalMomentoEspecificoComponent;
  let fixture: ComponentFixture<ModalMomentoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMomentoEspecificoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalMomentoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
