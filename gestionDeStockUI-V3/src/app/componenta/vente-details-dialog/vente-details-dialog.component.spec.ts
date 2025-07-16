import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDetailsDialogComponent } from './vente-details-dialog.component';

describe('VenteDetailsDialogComponent', () => {
  let component: VenteDetailsDialogComponent;
  let fixture: ComponentFixture<VenteDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VenteDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
