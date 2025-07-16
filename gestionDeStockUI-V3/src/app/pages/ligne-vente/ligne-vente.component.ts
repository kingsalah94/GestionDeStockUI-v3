import {Component, ViewChild} from '@angular/core';
import Papa from 'papaparse';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
interface LigneCommande {
  article: string;
  quantite: number;
  prixHT: number;
  tva: number;
  totalHT: number;
  totalTTC: number;
}
interface Commande {
  id: number;
  client: string;
  date: Date;
  lignes: LigneCommande[];
  statut: 'En attente' | 'Validée' | 'Livrée';
  totalHT: number;
  totalTVA: number;
  totalTTC: number;
  paiement: 'Non payé' | 'Payé';
}
@Component({
  selector: 'app-ligne-vente',
  templateUrl: './ligne-vente.component.html',
  styleUrl: './ligne-vente.component.css'
})
export class LigneVenteComponent {
  venteDataSource = new MatTableDataSource<Commande>([]);
  displayedColumns: string[] = ['id', 'client', 'date', 'totalHT', 'totalTTC', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showVenteForm = false;
  editMode = false;
  venteForm: {
    client: string;
    articles: string[]; // contient les noms d'articles
    status: 'En attente' | 'Validée' | 'Livrée';
    totalHT: number;
    totalTVA: number;
    totalTTC: number;
    lignes: LigneCommande[];
  } = {
    client: '',
    articles: [],
    status: 'En attente',
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    lignes: []
  };

  articlesList = [
    { designation: 'Article A', prixHT: 100, tva: 18 },
    { designation: 'Article B', prixHT: 200, tva: 18 },
    { designation: 'Article C', prixHT: 150, tva: 18 },
  ];

  ngAfterViewInit() {
    this.venteDataSource.paginator = this.paginator;
  }

  toggleAddVente() {
    this.resetForm();
    this.showVenteForm = true;
    this.editMode = false;
  }

  editVente(element: Commande) {
    this.venteForm.client = element.client;
    this.venteForm.status = element.statut;
    this.venteForm.articles = element.lignes.map(l => l.article);
    this.venteForm.lignes = JSON.parse(JSON.stringify(element.lignes));
    this.venteForm.totalHT = element.totalHT;
    this.venteForm.totalTVA = element.totalTVA;
    this.venteForm.totalTTC = element.totalTTC;
    this.editMode = true;
    this.showVenteForm = true;
  }

  saveVente() {
    this.calculerTotaux();

    const newCommande: Commande = {
      id: Date.now(),
      client: this.venteForm.client,
      date: new Date(),
      statut: this.venteForm.status,
      paiement: 'Non payé',
      lignes: this.venteForm.lignes,
      totalHT: this.venteForm.totalHT,
      totalTVA: this.venteForm.totalTVA,
      totalTTC: this.venteForm.totalTTC,
    };

    if (this.editMode) {
      // mise à jour
      this.venteDataSource.data = this.venteDataSource.data.map(c =>
        c.id === newCommande.id ? newCommande : c
      );
    } else {
      this.venteDataSource.data = [...this.venteDataSource.data, newCommande];
    }

    this.resetForm();
  }

  viewDetails(element: Commande) {
    alert(`Commande de ${element.client}, total TTC: ${element.totalTTC} FCFA`);
  }

  deleteVente(id: number) {
    this.venteDataSource.data = this.venteDataSource.data.filter(c => c.id !== id);
  }

  cancelVenteForm() {
    this.resetForm();
  }

  resetForm() {
    this.venteForm = {
      client: '',
      articles: [],
      status: 'En attente',
      totalHT: 0,
      totalTVA: 0,
      totalTTC: 0,
      lignes: []
    };
    this.showVenteForm = false;
    this.editMode = false;
  }

  calculerTotaux() {
    const lignes: LigneCommande[] = this.venteForm.articles.map(articleNom => {
      const article = this.articlesList.find(a => a.designation === articleNom);
      if (!article) return {
        article: articleNom,
        quantite: 1,
        prixHT: 0,
        tva: 0,
        totalHT: 0,
        totalTTC: 0
      };

      const prixHT = article.prixHT;
      const tva = article.tva;
      const quantite = 1;
      const totalHT = prixHT * quantite;
      const totalTTC = totalHT * (1 + tva / 100);

      return { article: articleNom, quantite, prixHT, tva, totalHT, totalTTC };
    });

    this.venteForm.lignes = lignes;
    this.venteForm.totalHT = lignes.reduce((sum, l) => sum + l.totalHT, 0);
    this.venteForm.totalTTC = lignes.reduce((sum, l) => sum + l.totalTTC, 0);
    this.venteForm.totalTVA = this.venteForm.totalTTC - this.venteForm.totalHT;
  }

  filterVentes(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.venteDataSource.filter = value;
  }

  exportVentesCSV() {
    const csv = Papa.unparse(this.venteDataSource.data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ventes.csv';
    a.click();
  }

  importVentesCSV(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const commandes = result.data.map((row: any) => ({
          id: +row.id,
          client: row.client,
          date: new Date(row.date),
          statut: row.statut as 'En attente' | 'Validée' | 'Livrée',
          paiement: row.paiement as 'Non payé' | 'Payé',
          lignes: [], // non supporté pour le moment
          totalHT: parseFloat(row.totalHT),
          totalTVA: parseFloat(row.totalTVA),
          totalTTC: parseFloat(row.totalTTC),
        }));

        this.venteDataSource.data = commandes;
      }
    });
  }
}
