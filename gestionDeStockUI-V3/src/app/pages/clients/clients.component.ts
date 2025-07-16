import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import Papa from 'papaparse';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

  showAddClient = false;
  showEditClient = false;
  clientForm!: FormGroup;
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'telephone', 'adresse', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: [''],
    });
  }

  toggleAddClient() {
    this.showAddClient = !this.showAddClient;
    this.showEditClient = false;
    this.clientForm.reset();
  }

  toggleEditClient(row: any) {
    this.showEditClient = true;
    this.showAddClient = false;
    this.clientForm.patchValue(row);
  }

  closePanels() {
    this.showAddClient = false;
    this.showEditClient = false;
  }

  saveClient() {
    const newClient = this.clientForm.value;
    const currentData = this.dataSource.data;
    newClient.id = currentData.length + 1;
    this.dataSource.data = [...currentData, newClient];
    this.closePanels();
  }

  editClient() {
    // Logique de mise à jour
    this.closePanels();
  }

  filterData(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

// Exporter vers CSV
  exportToCSV() {
    const csv = Papa.unparse(this.dataSource.data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'clients.csv');
    link.click();
  }

// Importer depuis CSV
  importFromCSV(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const importedClients = result.data.map((item: any, index: number) => ({
          id: this.dataSource.data.length + index + 1,
          nom: item.nom || '',
          prenom: item.prenom || '',
          email: item.email || '',
          telephone: item.telephone || '',
          adresse: item.adresse || ''
        }));
        this.dataSource.data = [...this.dataSource.data, ...importedClients];
      },
    });
  }

// Télécharger un modèle CSV vide
  downloadCSVTemplate() {
    const headers = ['nom', 'prenom', 'email', 'telephone', 'adresse'];
    const csv = Papa.unparse([headers]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'client_template.csv');
    link.click();
  }

}
