import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import Papa from 'papaparse';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrl: './fournisseurs.component.css'
})
export class FournisseursComponent {
  showAddFournisseur = false;
  showEditFournisseur = false;
  FournisseurForm!: FormGroup;
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'telephone', 'adresse', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private fb: FormBuilder) {
    this.FournisseurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: [''],
    });
  }

  toggleAddFournisseur() {
    this.showAddFournisseur = !this.showAddFournisseur;
    this.showEditFournisseur = false;
    this.FournisseurForm.reset();
  }

  toggleEditFournisseur(row: any) {
    this.showEditFournisseur = true;
    this.showAddFournisseur = false;
    this.FournisseurForm.patchValue(row);
  }

  closePanels() {
    this.showAddFournisseur = false;
    this.showEditFournisseur = false;
  }

  saveFournisseur() {
    const newFournisseur = this.FournisseurForm.value;
    const currentData = this.dataSource.data;
    newFournisseur.id = currentData.length + 1;
    this.dataSource.data = [...currentData, newFournisseur];
    this.closePanels();
  }

  editFournisseur() {
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
    link.setAttribute('download', 'Fournisseurs.csv');
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
        const importedFournisseurs = result.data.map((item: any, index: number) => ({
          id: this.dataSource.data.length + index + 1,
          nom: item.nom || '',
          prenom: item.prenom || '',
          email: item.email || '',
          telephone: item.telephone || '',
          adresse: item.adresse || ''
        }));
        this.dataSource.data = [...this.dataSource.data, ...importedFournisseurs];
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
    link.setAttribute('download', 'Fournisseur_template.csv');
    link.click();
  }

}
