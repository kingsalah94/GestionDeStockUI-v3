import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  selector: 'app-vente-details-dialog',
  templateUrl: './vente-details-dialog.component.html',
  styleUrls: ['./vente-details-dialog.component.css']
})
export class VenteDetailsDialogComponent {
  logoBase64 = 'assets/user.png';
  constructor(@Inject(MAT_DIALOG_DATA) public data: Commande) {}

  generatePDF(): void {
    const doc = new jsPDF();

    // Logo et en-tête
    if (this.logoBase64) {
      doc.addImage(this.logoBase64, 'PNG', 160, 10, 30, 30);
    }
    doc.setFontSize(16);
    doc.text('Facture Vente - Gestion de Stock', 14, 20);
    doc.setFontSize(12);
    doc.text(`Client: ${this.data.client || ''}`, 14, 30);
    doc.text(`Date: ${this.data.date ? new Date(this.data.date).toLocaleDateString() : ''}`, 14, 37);
    doc.text(`Statut: ${this.data.statut || ''}`, 14, 44);
    doc.text(`Paiement: ${this.data.paiement || ''}`, 14, 51);

    // Corps du tableau
    const body = (this.data.lignes || []).map((ligne) => [
      ligne.article || '',
      (ligne.quantite ?? 0).toString(),
      (ligne.prixHT ?? 0).toFixed(2),
      (ligne.tva ?? 0).toString(),
      (ligne.totalHT ?? 0).toFixed(2),
      (ligne.totalTTC ?? 0).toFixed(2)
    ]);

    autoTable(doc, {
      head: [['Article', 'Quantité', 'Prix HT', 'TVA', 'Total HT', 'Total TTC']],
      body,
      startY: 60,
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 70;
    doc.text(`Total HT: ${(this.data.totalHT ?? 0).toFixed(2)} FCFA`, 14, finalY + 10);
    doc.text(`TVA: ${(this.data.totalTVA ?? 0).toFixed(2)} FCFA`, 14, finalY + 17);
    doc.text(`Total TTC: ${(this.data.totalTTC ?? 0).toFixed(2)} FCFA`, 14, finalY + 24);

    doc.save(`Facture_${this.data.client || 'client'}_${this.data.id || '0000'}.pdf`);
  }


  // genererPDF(commande: Commande) {
  //   const doc = new jsPDF();
  //
  //   // Logo + En-tête
  //   doc.addImage(this.logoBase64, 'PNG', 10, 10, 30, 30); // (image, format, x, y, width, height)
  //   doc.setFontSize(18);
  //   doc.text('GABERA SOFTWARE SOLUTIONS', 45, 20);
  //   doc.setFontSize(12);
  //   doc.text('Adresse : Quartier Koubia - Niamey, Niger', 45, 28);
  //   doc.text('Téléphone : +227 90 00 00 00 | Email : info@gabera.org', 45, 34);
  //
  //   // Ligne horizontale
  //   doc.setLineWidth(0.5);
  //   doc.line(10, 42, 200, 42);
  //
  //   // Infos de la facture
  //   let y = 50;
  //   doc.setFontSize(14);
  //   doc.text('FACTURE', 10, y);
  //
  //   doc.setFontSize(12);
  //   y += 10;
  //   doc.text(`N°: ${commande.id}`, 10, y);
  //   y += 8;
  //   doc.text(`Client: ${commande.client}`, 10, y);
  //   y += 8;
  //   doc.text(`Date: ${commande.date.toLocaleDateString()}`, 10, y);
  //   y += 8;
  //   doc.text(`Statut: ${commande.statut}`, 10, y);
  //   y += 8;
  //   doc.text(`Paiement: ${commande.paiement}`, 10, y);
  //
  //   y += 10;
  //   doc.setFontSize(13);
  //   doc.text('Détails des articles :', 10, y);
  //   y += 10;
  //
  //   commande.lignes.forEach((ligne, index) => {
  //     doc.setFontSize(11);
  //     doc.text(
  //       `${index + 1}. ${ligne.article} - Qte: ${ligne.quantite} - PU: ${ligne.prixHT} - TVA: ${ligne.tva}% - TTC: ${ligne.totalTTC}`,
  //       10,
  //       y
  //     );
  //     y += 8;
  //   });
  //
  //   y += 10;
  //   doc.setFontSize(12);
  //   doc.text(`Total HT : ${commande.totalHT} FCFA`, 10, y);
  //   y += 8;
  //   doc.text(`TVA       : ${commande.totalTVA} FCFA`, 10, y);
  //   y += 8;
  //   doc.text(`Total TTC : ${commande.totalTTC} FCFA`, 10, y);
  //
  //   // Enregistrer le PDF
  //   doc.save(`facture-${commande.id}.pdf`);
  // }
}
