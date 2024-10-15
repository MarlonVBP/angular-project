import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImgEspecificaComponent } from './modal-img-especifica.component';

describe('ModalImgEspecificaComponent', () => {
  let component: ModalImgEspecificaComponent;
  let fixture: ComponentFixture<ModalImgEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalImgEspecificaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalImgEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
