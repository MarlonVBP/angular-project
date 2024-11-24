import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUpService } from '../../../services/sign-up.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

class MockSignUpService {
  update() {
    return of({ success: true });
  }
}

class MockActivatedRoute {
  snapshot = { paramMap: { get: () => null } };
}

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let signUpService: SignUpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PerfilComponent,
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: SignUpService, useClass: MockSignUpService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    signUpService = TestBed.inject(SignUpService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all fields as touched on invalid form submission', () => {
    component.onSubmit();
    expect(component.perfilForm.touched).toBeTrue();
  });

  it('should call signUpService.update on valid form submission', () => {
    const updateSpy = spyOn(signUpService, 'update').and.callThrough();
    component.perfilForm.setValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    component.onSubmit();
    expect(updateSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should toggle password visibility on showPassword', () => {
    const initialType = component.typeInput;
    component.showPassword();
    expect(component.typeInput).not.toBe(initialType);
  });

  it('should toggle confirm password visibility on showConfirmPassword', () => {
    const initialType = component.typeInputConfirm;
    component.showConfirmPassword();
    expect(component.typeInputConfirm).not.toBe(initialType);
  });

  it('should display error message for mismatched passwords', () => {
    const passwordInput = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    const confirmPasswordInput = fixture.debugElement.query(
      By.css('#confirm-password')
    ).nativeElement;
    passwordInput.value = 'password123';
    confirmPasswordInput.value = 'password456';
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.mismatch).toBeTrue();
  });
});
