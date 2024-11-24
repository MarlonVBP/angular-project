import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { ReceitasService } from '../../../services/receitas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importação do BrowserAnimationsModule

class MockReceitasService {
  getRandomRecipes() {
    return of([{ meals: [{ idMeal: '1', strMeal: 'Receita 1' }] }]);
  }
  getRecipesWithUpdates() {
    return of([{ meals: [{ idMeal: '2', strMeal: 'Receita 2' }] }]);
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => null,  // Mock para os parâmetros da rota
    },
  };
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let receitaService: ReceitasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, MatProgressSpinnerModule, BrowserAnimationsModule], // Adicionando BrowserAnimationsModule
      providers: [
        { provide: ReceitasService, useClass: MockReceitasService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }, // Mock do ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    receitaService = TestBed.inject(ReceitasService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load recipes on init', () => {
    spyOn(receitaService, 'getRandomRecipes').and.callThrough();
    component.load(1);
    expect(receitaService.getRandomRecipes).toHaveBeenCalled();
    expect(component.receitas.length).toBeGreaterThan(0);
  });

  it('should display "Carregando..." when recipes are being loaded', () => {
    component.loadingrecipes = true;
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector('.spinner');
    expect(loadingElement).toBeTruthy();
  });

  it('should call nextPage and load more recipes', () => {
    component.nextPage();
    expect(component.currentPage).toBeGreaterThan(1);
    expect(component.receitas.length).toBeGreaterThan(0);
  });

  it('should open the modal when a recipe is clicked', () => {
    const recipe = { idMeal: '1', strMeal: 'Receita 1' };
    spyOn(component, 'showInput').and.callThrough();
    component.showInput(recipe);
    expect(component.showInput).toHaveBeenCalledWith(recipe);
    expect(component.isModalOpen).toBeTrue();
  });
});
