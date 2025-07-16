import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Role {
  id: number;
  nom: string;
  description: string;
}

@Component({
  selector: 'app-roles-settings',
  templateUrl: './roles-settings.component.html',
  styleUrls: ['./roles-settings.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0%)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', [animate('300ms ease-in')]),
      transition('in => out', [animate('300ms ease-out')])
    ])
  ]
})
export class RolesSettingsComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'description', 'actions'];
  dataSource = new MatTableDataSource<Role>([]);
  showPanel = false;
  editMode = false;
  form: Partial<Role> = {};
  editingId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.data = [
      { id: 1, nom: 'ADMIN', description: 'Accès total à la plateforme' },
      { id: 2, nom: 'USER', description: 'Accès restreint' }
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

  edit(item: Role) {
    this.form = { ...item };
    this.editingId = item.id;
    this.editMode = true;
    this.showPanel = true;
  }

  delete(item: Role) {
    const confirmDelete = confirm(`Supprimer le rôle "${item.nom}" ?`);
    if (confirmDelete) {
      this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
    }
  }

  save() {
    if (!this.form.nom || !this.form.description) {
      alert('Tous les champs sont requis.');
      return;
    }

    if (this.editMode && this.editingId !== null) {
      this.dataSource.data = this.dataSource.data.map(i =>
        i.id === this.editingId ? { ...i, ...this.form } as Role : i
      );
    } else {
      const newRole: Role = {
        id: Date.now(),
        nom: this.form.nom!,
        description: this.form.description!
      };
      this.dataSource.data = [...this.dataSource.data, newRole];
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
