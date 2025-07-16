import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Categorie {
  id: number;
  code: string;
  libelle: string;
}

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0%)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out')
      ]),
      transition('in => out', [
        animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CategorySettingsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'libelle', 'actions'];
  dataSource = new MatTableDataSource<Categorie>([]);
  form: Partial<Categorie> = {};
  editMode: boolean = false;
  showPanel: boolean = false;
  editingId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // Données d'exemple
    this.dataSource.data = [
      { id: 1, code: 'CAT-001', libelle: 'Informatique' },
      { id: 2, code: 'CAT-002', libelle: 'Bureau' }
    ];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterData(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  toggleAddPanel() {
    this.form = {};
    this.editMode = false;
    this.editingId = null;
    this.showPanel = true;
  }

  edit(categorie: Categorie) {
    this.form = { ...categorie };
    this.editMode = true;
    this.editingId = categorie.id;
    this.showPanel = true;
  }

  delete(categorie: Categorie) {
    const confirmDelete = confirm(`Supprimer la catégorie "${categorie.libelle}" ?`);
    if (confirmDelete) {
      this.dataSource.data = this.dataSource.data.filter(cat => cat.id !== categorie.id);
    }
  }

  save() {
    if (!this.form.code || !this.form.libelle) {
      alert("Tous les champs sont requis.");
      return;
    }

    if (this.editMode && this.editingId !== null) {
      // Modifier
      this.dataSource.data = this.dataSource.data.map(cat =>
        cat.id === this.editingId ? { ...cat, ...this.form } as Categorie : cat
      );
    } else {
      // Ajouter
      const newCategorie: Categorie = {
        id: Date.now(),
        code: this.form.code!,
        libelle: this.form.libelle!
      };
      this.dataSource.data = [...this.dataSource.data, newCategorie];
    }

    this.closePanel();
  }

  closePanel() {
    this.showPanel = false;
    this.form = {};
    this.editingId = null;
  }

  get columns(): string[] {
    return this.displayedColumns;
  }
}
