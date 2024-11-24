import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContatoComponent } from './contato.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Necessário para animações

// Mock do ActivatedRoute
class MockActivatedRoute {
  // Você pode mockar os métodos ou valores usados no componente
  params = of({});
}

class MockMatSnackBar {
  open = jasmine.createSpy('open');
}

describe('ContatoComponent', () => {
  let component: ContatoComponent;
  let fixture: ComponentFixture<ContatoComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule, BrowserAnimationsModule, ContatoComponent],
      providers: [
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },  // Mock do ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message on invalid form submission', () => {
    component.onSubmit();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Falha ao enviar a mensagem.',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should display a success message on valid form submission', () => {
    component.contactForm.setValue({
      email: 'test@example.com',
      name: 'Test User',
      category: 'ajuda',
      message: 'Test message',
    });

    component.onSubmit();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Mensagem enviada com sucesso.',
      'Fechar',
      jasmine.any(Object)
    );
  });
});
