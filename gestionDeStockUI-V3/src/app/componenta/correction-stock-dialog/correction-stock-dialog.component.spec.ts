import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionStockDialogComponent } from './correction-stock-dialog.component';

describe('CorrectionStockDialogComponent', () => {
  let component: CorrectionStockDialogComponent;
  let fixture: ComponentFixture<CorrectionStockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorrectionStockDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectionStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
