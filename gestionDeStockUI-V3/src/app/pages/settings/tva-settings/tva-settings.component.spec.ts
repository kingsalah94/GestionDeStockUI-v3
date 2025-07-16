import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaSettingsComponent } from './tva-settings.component';

describe('TvaSettingsComponent', () => {
  let component: TvaSettingsComponent;
  let fixture: ComponentFixture<TvaSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvaSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
