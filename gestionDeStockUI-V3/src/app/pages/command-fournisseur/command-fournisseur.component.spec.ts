import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandFournisseurComponent } from './command-fournisseur.component';

describe('CommandFournisseurComponent', () => {
  let component: CommandFournisseurComponent;
  let fixture: ComponentFixture<CommandFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandFournisseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
