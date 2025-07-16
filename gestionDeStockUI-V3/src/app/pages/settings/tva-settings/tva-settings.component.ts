import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface TVA {
  id: number;
  nom: string;
  taux: number;
}

@Component({
  selector: 'app-tva-settings',
  templateUrl: './tva-settings.component.html',
  styleUrls: ['./tva-settings.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0%)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', [animate('300ms ease-in')]),
      transition('in => out', [animate('300ms ease-out')])
    ])
  ]
})
export class TvaSettingsComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'taux', 'actions'];
  dataSource = new MatTableDataSource<TVA>([]);
  showPanel = false;
  editMode = false;
  form: Partial<TVA> = {};
  editingId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.data = [
      { id: 1, nom: 'TVA Standard', taux: 19.25 },
      { id: 2, nom: 'TVA Réduite', taux: 5.5 }
    ];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleAddPanel() {
    this.form = {};
    this.editMode = false;
    this.showPanel = true;
  }

  edit(item: TVA) {
    this.form = { ...item };
    this.editingId = item.id;
    this.editMode = true;
    this.showPanel = true;
  }

  delete(item: TVA) {
    const confirmDelete = confirm(`Supprimer la TVA "${item.nom}" ?`);
    if (confirmDelete) {
      this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
    }
  }

  save() {
    if (!this.form.nom || this.form.taux === undefined) {
      alert('Tous les champs sont requis.');
      return;
    }

    if (this.editMode && this.editingId !== null) {
      this.dataSource.data = this.dataSource.data.map(i =>
        i.id === this.editingId ? { ...i, ...this.form } as TVA : i
      );
    } else {
      const newTVA: TVA = {
        id: Date.now(),
        nom: this.form.nom!,
        taux: this.form.taux!
      };
      this.dataSource.data = [...this.dataSource.data, newTVA];
    }

    this.closePanel();
  }

  closePanel() {
    this.form = {};
    this.showPanel = false;
    this.editingId = null;
  }

  filterData(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  get columns(): string[] {
    return this.displayedColumns;
  }
}
