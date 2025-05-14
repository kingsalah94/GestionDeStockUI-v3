import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalviewComponent } from './globalview.component';

describe('GlobalviewComponent', () => {
  let component: GlobalviewComponent;
  let fixture: ComponentFixture<GlobalviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
