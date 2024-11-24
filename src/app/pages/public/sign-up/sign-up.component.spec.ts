import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignUpService } from '../../../services/sign-up.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpService: jasmine.SpyObj<SignUpService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const signUpSpy = jasmine.createSpyObj('SignUpService', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        SignUpComponent, // Importando diretamente o componente standalone
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: SignUpService, useValue: signUpSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    signUpService = TestBed.inject(
      SignUpService
    ) as jasmine.SpyObj<SignUpService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should check password match validation', () => {
    component.signUpForm.controls['password'].setValue('password123');
    component.signUpForm.controls['confirmPassword'].setValue('password123');
    expect(component.mismatch).toBeFalse();

    component.signUpForm.controls['confirmPassword'].setValue('password456');
    expect(component.mismatch).toBeTrue();
  });

  it('should navigate to login page when login link is clicked', () => {
    const loginLink = fixture.debugElement.query(
      By.css('.sign-up_link')
    ).nativeElement;
    loginLink.click();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should submit form with valid inputs', () => {
    component.signUpForm.controls['email'].setValue('test@test.com');
    component.signUpForm.controls['nome'].setValue('Test User');
    component.signUpForm.controls['password'].setValue('password123');
    component.signUpForm.controls['confirmPassword'].setValue('password123');

    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(signUpService.create).toHaveBeenCalledWith({
      email: 'test@test.com',
      nome: 'Test User',
      password: 'password123',
    });
  });
});
