import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importando BrowserAnimationsModule

class MockAuthService {
  logar() {
    return of({ success: true });
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, MatSnackBarModule, BrowserAnimationsModule], // Adicionando BrowserAnimationsModule
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all fields as touched on invalid form submission', () => {
    component.onSubmit();
    expect(component.loginForm.touched).toBeTrue();
  });

  it('should call authService.logar on valid form submission', () => {
    const logarSpy = spyOn(authService, 'logar').and.callThrough();
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();
    expect(logarSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      senha: 'password123',
    });
  });

  it('should navigate to sign-up page when signUp is called', () => {
    component.signUp();
    expect(router.navigate).toHaveBeenCalledWith(['sign-up']);
  });

  it('should toggle password visibility on showPassword', () => {
    const initialType = component.typeInput;
    component.showPassword();
    expect(component.typeInput).not.toBe(initialType);
  });
});
