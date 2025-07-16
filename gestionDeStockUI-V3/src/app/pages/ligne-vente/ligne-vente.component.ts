import {AfterViewInit, Component, ViewChild} from '@angular/core';
import Papa from 'papaparse';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import {VenteDetailsDialogComponent} from '../../componenta/vente-details-dialog/vente-details-dialog.component';
import {MatDialog} from '@angular/material/dialog';
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

interface ArticleStock {
  designation: string;
  quantiteDisponible: number;
  prixHT: number;
  tva: number;
}


@Component({
  selector: 'app-ligne-vente',
  templateUrl: './ligne-vente.component.html',
  styleUrl: './ligne-vente.component.css'
})
export class LigneVenteComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'client', 'date', 'totalHT', 'totalTTC', 'status','paiement', 'actions'];
  venteDataSource = new MatTableDataSource<Commande>([]);
  articlesList: LigneCommande[] = [];
  filtrePaiement: string = '';
  filtreTexte: string = '';
  logoBase64 = 'assets/user.png'; // tronqué ici

  constructor(private dialog: MatDialog) {}

  viewDetails(commande: Commande) {
    this.dialog.open(VenteDetailsDialogComponent, {
      width: '800px',
      data: commande
    });
  }

  venteForm: {
    client: string;
    articles: LigneCommande[];
    status: 'En attente' | 'Validée' | 'Livrée';
    totalHT: number;
    totalTVA: number;
    totalTTC: number;
    paiement: 'Non payé' | 'Payé';
  } = {
    client: '',
    articles: [],
    status: 'En attente',
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    paiement: 'Non payé'
  };

  showVenteForm = false;
  editMode = false;

  stock: { article: string; quantite: number }[] = [
    { article: 'Article A', quantite: 100 },
    { article: 'Article B', quantite: 50 },
    { article: 'Article C', quantite: 75 }
  ];

  ngAfterViewInit() {
    this.venteDataSource.paginator = this.paginator;
  }

  appliquerFiltres() {
    this.venteDataSource.filterPredicate = (data: Commande, filter: string) => {
      const terme = filter.trim().toLowerCase();

      const correspondTexte = data.client.toLowerCase().includes(terme) ||
        data.statut.toLowerCase().includes(terme) ||
        data.date.toLocaleDateString().toLowerCase().includes(terme);

      const correspondPaiement = this.filtrePaiement === '' || data.paiement === this.filtrePaiement;

      return correspondTexte && correspondPaiement;
    };

    this.venteDataSource.filter = this.filtreTexte.trim().toLowerCase();
  }
  onFilterTextChange(value: string) {
    this.filtreTexte = value;
    this.appliquerFiltres();
  }

  toggleAddVente() {
    this.showVenteForm = true;
    this.editMode = false;
    this.venteForm = {
      client: '',
      articles: [],
      status: 'En attente',
      totalHT: 0,
      totalTVA: 0,
      totalTTC: 0,
      paiement: 'Non payé'
    };
  }

  cancelVenteForm() {
    this.showVenteForm = false;
    this.venteForm.articles = [];
  }

  saveVente() {
    if (!this.venteForm.client || this.venteForm.articles.length === 0) return;

    // Vérifier le stock disponible
    const stockOk = this.venteForm.articles.every((ligne) => {
      const item = this.stock.find(s => s.article === ligne.article);
      return item && item.quantite >= ligne.quantite;
    });

    if (!stockOk) {
      alert('Stock insuffisant pour un ou plusieurs articles.');
      return;
    }

    // Calcul des totaux
    let totalHT = 0;
    let totalTTC = 0;

    this.venteForm.articles.forEach(ligne => {
      ligne.totalHT = ligne.prixHT * ligne.quantite;
      ligne.totalTTC = ligne.totalHT * (1 + ligne.tva / 100);
      totalHT += ligne.totalHT;
      totalTTC += ligne.totalTTC;
    });

    const totalTVA = totalTTC - totalHT;

    const newCmd: Commande = {
      id: Date.now(),
      client: this.venteForm.client,
      date: new Date(),
      lignes: this.venteForm.articles,
      statut: this.venteForm.status,
      paiement: this.venteForm.paiement,
      totalHT,
      totalTVA,
      totalTTC
    };

    this.venteDataSource.data = [...this.venteDataSource.data, newCmd];

    // Décrémenter le stock
    this.venteForm.articles.forEach((ligne) => {
      const item = this.stock.find(s => s.article === ligne.article);
      if (item) item.quantite -= ligne.quantite;
    });

    this.cancelVenteForm();
  }

  editVente(cmd: Commande) {
    this.editMode = true;
    this.showVenteForm = true;
    this.venteForm = {
      client: cmd.client,
      articles: [...cmd.lignes],
      status: cmd.statut,
      totalHT: cmd.totalHT,
      totalTVA: cmd.totalTVA,
      totalTTC: cmd.totalTTC,
      paiement: cmd.paiement
    };
  }

  deleteVente(id: number) {
    this.venteDataSource.data = this.venteDataSource.data.filter(c => c.id !== id);
  }

  // viewDetails(cmd: Commande) {
  //   console.log(cmd);
  // }

  filterVentes(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.venteDataSource.filter = filterValue.trim().toLowerCase();
  }

  exportVentesCSV() {
    const csvData = Papa.unparse(this.venteDataSource.data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ventes.csv';
    a.click();
  }

  importVentesCSV(event: any) {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results: any) => {
          this.venteDataSource.data = results.data.map((row: any) => ({
            ...row,
            date: new Date(row.date),
            lignes: [], // à adapter si les lignes sont incluses
          }));
        }
      });
    }
  }

  // Exemple de logo encodé en base64 (remplace par ton propre logo)


  genererPDF(commande: Commande) {
    const doc = new jsPDF();

    // Logo + En-tête
    doc.addImage(this.logoBase64, 'PNG', 10, 10, 30, 30); // (image, format, x, y, width, height)
    doc.setFontSize(18);
    doc.text('GABERA SOFTWARE SOLUTIONS', 45, 20);
    doc.setFontSize(12);
    doc.text('Adresse : Quartier Koubia - Niamey, Niger', 45, 28);
    doc.text('Téléphone : +227 90 00 00 00 | Email : info@gabera.org', 45, 34);

    // Ligne horizontale
    doc.setLineWidth(0.5);
    doc.line(10, 42, 200, 42);

    // Infos de la facture
    let y = 50;
    doc.setFontSize(14);
    doc.text('FACTURE', 10, y);

    doc.setFontSize(12);
    y += 10;
    doc.text(`N°: ${commande.id}`, 10, y);
    y += 8;
    doc.text(`Client: ${commande.client}`, 10, y);
    y += 8;
    doc.text(`Date: ${commande.date.toLocaleDateString()}`, 10, y);
    y += 8;
    doc.text(`Statut: ${commande.statut}`, 10, y);
    y += 8;
    doc.text(`Paiement: ${commande.paiement}`, 10, y);

    y += 10;
    doc.setFontSize(13);
    doc.text('Détails des articles :', 10, y);
    y += 10;

    commande.lignes.forEach((ligne, index) => {
      doc.setFontSize(11);
      doc.text(
        `${index + 1}. ${ligne.article} - Qte: ${ligne.quantite} - PU: ${ligne.prixHT} - TVA: ${ligne.tva}% - TTC: ${ligne.totalTTC}`,
        10,
        y
      );
      y += 8;
    });

    y += 10;
    doc.setFontSize(12);
    doc.text(`Total HT : ${commande.totalHT} FCFA`, 10, y);
    y += 8;
    doc.text(`TVA       : ${commande.totalTVA} FCFA`, 10, y);
    y += 8;
    doc.text(`Total TTC : ${commande.totalTTC} FCFA`, 10, y);

    // Enregistrer le PDF
    doc.save(`facture-${commande.id}.pdf`);
  }


  simulerPaiement(cmd: Commande) {
    cmd.paiement = 'Payé';
    alert(`Paiement de la commande #${cmd.id} confirmé.`);
  }
}
