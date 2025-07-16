import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Papa from 'papaparse';

interface CommandeClient {
  id: number;
  client: string;
  date: string;
  montant: number;
  status: 'PAYÉ' | 'EN ATTENTE';
}
@Component({
  selector: 'app-command-client',
  templateUrl: './command-client.component.html',
  styleUrl: './command-client.component.css'
})
export class CommandClientComponent {
  displayedColumns: string[] = ['id', 'client', 'date', 'montant', 'status', 'actions'];
  dataSource = new MatTableDataSource<CommandeClient>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showAddCommande = false;
  showEditCommande = false;
  selectedCommandeIndex: number | null = null;

  commandeForm: CommandeClient = {
    id: 0,
    client: '',
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
      { id: 1, client: 'Client A', date: '2024-07-10', montant: 150000, status: 'PAYÉ' },
      { id: 2, client: 'Client B', date: '2024-07-12', montant: 85000, status: 'EN ATTENTE' },
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
      client: '',
      date: '',
      montant: 0,
      status: 'EN ATTENTE'
    };
  }

  generateNewId(): number {
    const ids = this.dataSource.data.map(d => d.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  editCommande(commande: CommandeClient) {
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
      client: '',
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
    link.setAttribute('download', 'commandes-client.csv');
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
        const imported: CommandeClient[] = result.data.map((item: any) => ({
          id: +item.id,
          client: item.client,
          date: item.date,
          montant: +item.montant,
          status: item.status === 'PAYÉ' ? 'PAYÉ' : 'EN ATTENTE'
        }));
        this.dataSource.data = [...this.dataSource.data, ...imported];
      }
    });
  }
}
