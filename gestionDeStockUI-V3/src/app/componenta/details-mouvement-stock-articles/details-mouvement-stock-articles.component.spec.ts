import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMouvementStockArticlesComponent } from './details-mouvement-stock-articles.component';

describe('DetailsMouvementStockArticlesComponent', () => {
  let component: DetailsMouvementStockArticlesComponent;
  let fixture: ComponentFixture<DetailsMouvementStockArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsMouvementStockArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMouvementStockArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
