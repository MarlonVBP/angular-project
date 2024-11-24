import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, CommonModule, RouterLink, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}  // Mock do ActivatedRoute
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "404 - Página não encontrada" message', () => {
    const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    const subtitleElement = fixture.debugElement.query(By.css('.sub-title')).nativeElement;

    expect(titleElement.textContent).toBe('Oops!');
    expect(subtitleElement.textContent).toBe('404 - Página não encontrada');
  });

  it('should navigate to the home page when the "Voltar para a página inicial" button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.button')).nativeElement;
    expect(button.getAttribute('ng-reflect-router-link')).toBe('/');
  });
});
