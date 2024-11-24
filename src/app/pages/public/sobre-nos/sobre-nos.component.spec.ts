import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobreNosComponent } from './sobre-nos.component';
import { HeaderPageComponent } from '../../../components/public/header-page/header-page.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { FabButtonComponent } from '../../../components/public/fab-button/fab-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importando o módulo de animações
import { By } from '@angular/platform-browser';

describe('SobreNosComponent', () => {
  let component: SobreNosComponent;
  let fixture: ComponentFixture<SobreNosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SobreNosComponent,
        HeaderPageComponent,
        FooterComponent,
        RouterTestingModule,
        BrowserAnimationsModule, // Adicionando o BrowserAnimationsModule
        FabButtonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SobreNosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Hello World text', () => {
    const helloWorldText = fixture.debugElement.query(By.css('.ola-mundo')).nativeElement;
    expect(helloWorldText.textContent).toBe('Hello World!!!');
  });

  it('should have a header and footer', () => {
    const header = fixture.debugElement.query(By.css('app-header-page'));
    const footer = fixture.debugElement.query(By.css('app-footer'));

    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
  });


});
