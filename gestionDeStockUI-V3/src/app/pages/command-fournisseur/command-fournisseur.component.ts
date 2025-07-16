import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Papa from 'papaparse';


interface CommandeFournisseur {
  id: number;
  fournisseur: string;
  date: string;
  montant: number;
  status: 'REÇUE' | 'EN ATTENTE';
}
@Component({
  selector: 'app-command-fournisseur',
  templateUrl: './command-fournisseur.component.html',
  styleUrl: './command-fournisseur.component.css'
})
export class CommandFournisseurComponent implements OnInit{
  displayedColumns: string[] = ['id', 'fournisseur', 'date', 'montant', 'status', 'actions'];
  dataSource = new MatTableDataSource<CommandeFournisseur>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showAddCommande = false;
  showEditCommande = false;
  selectedCommandeIndex: number | null = null;

  commandeForm: CommandeFournisseur = {
    id: 0,
    fournisseur: '',
    date: '',
    montant: 0,
    status: 'EN ATTENTE',
  };

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadInitialData();
  }

  loadInitialData() {
    this.dataSource.data = [
      { id: 1, fournisseur: 'Fournisseur A', date: '2024-07-05', montant: 120000, status: 'REÇUE' },
      { id: 2, fournisseur: 'Fournisseur B', date: '2024-07-07', montant: 64000, status: 'EN ATTENTE' },
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleAddCommande() {
    this.showAddCommande = true;
    this.showEditCommande = false;
    this.commandeForm = {
      id: this.generateNewId(),
      fournisseur: '',
      date: '',
      montant: 0,
      status: 'EN ATTENTE'
    };
  }

  generateNewId(): number {
    const ids = this.dataSource.data.map(d => d.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  editCommande(commande: CommandeFournisseur) {
    this.commandeForm = { ...commande };
    this.selectedCommandeIndex = this.dataSource.data.findIndex(c => c.id === commande.id);
    this.showEditCommande = true;
    this.showAddCommande = false;
  }

  saveCommande() {
    if (this.showAddCommande) {
      this.dataSource.data = [...this.dataSource.data, this.commandeForm];
    } else if (this.showEditCommande && this.selectedCommandeIndex !== null) {
      const updatedData = [...this.dataSource.data];
      updatedData[this.selectedCommandeIndex] = this.commandeForm;
      this.dataSource.data = updatedData;
    }
    this.closeCommandePanel();
  }

  closeCommandePanel() {
    this.showAddCommande = false;
    this.showEditCommande = false;
    this.commandeForm = {
      id: 0,
      fournisseur: '',
      date: '',
      montant: 0,
      status: 'EN ATTENTE',
    };
  }

  exportToCSV() {
    const csv = Papa.unparse(this.dataSource.data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'commandes-fournisseur.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  importFromCSV(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        const imported: CommandeFournisseur[] = result.data.map((item: any) => ({
          id: +item.id,
          fournisseur: item.fournisseur,
          date: item.date,
          montant: +item.montant,
          status: item.status === 'REÇUE' ? 'REÇUE' : 'EN ATTENTE'
        }));
        this.dataSource.data = [...this.dataSource.data, ...imported];
      }
    });
  }
}
