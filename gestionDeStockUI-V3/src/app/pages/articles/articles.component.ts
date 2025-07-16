import {Component, inject, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ArticleDetailsDialogComponent} from '../../componenta/article-details-dialog/article-details-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import Papa from 'papaparse';
import {ConfirmImportDialogComponent} from '../../componenta/confirm-import-dialog/confirm-import-dialog.component';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  public articles: any;
  public displayedColumns: string[] = ["id", "codeArticle", "designation", "prixUnitaire", "tauxTVA","prixUnitaireTTC","categories","action"];
  public dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showAddArticle = false;
  showEditArticle = false;
  @Inject(MatDialog)
  readonly dialog = inject(MatDialog);
  // ...

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.articles = [];
    // dans ton composant / service
    this.articles = Array.from({ length: 99 }, (_, idx) => {
      const id = idx + 1;
      return {
        id,
        codeArticle: Math.random().toString(15).substring(2, 10),        // chaîne aléatoire base36
        designation: Math.random().toString(36).substring(2, 50), // un peu plus long
        prixUnitaire: parseFloat((Math.random() * 100).toFixed(2)),         // image aléatoire via Picsum
        tauxTVA: parseFloat((Math.random() * 100).toFixed(2)),      // prix entre 0.00 et 100.00
        prixUnitaireTTC: parseFloat((Math.random() * 100).toFixed(2)),      // prix entre 0.00 et 100.00
        categories: parseFloat((Math.random() * 100).toFixed(2)),      // prix entre 0.00 et 100.00
      };
    });

    this.dataSource = new MatTableDataSource(this.articles);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterdata(event: Event) {
    // @ts-ignore
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }



  // close(): void {
  //   this.dialogRef.close();
  // }

  saveArticle(): void {
    // TODO: valider / persister l'article ici
    // puis fermer le panneau d’ajout
    this.showAddArticle = false;
  }
  editArticle(): void {
    // TODO: valider / persister l'article ici
    // puis fermer le panneau d’ajout
    this.showEditArticle = false;
  }



  toggleAddArticle() {
    this.showAddArticle = true;
    this.showEditArticle = false;
  }

  toggleEditArticle() {
    this.showEditArticle = true;
    this.showAddArticle = false;
  }
  // openDetailsDialog(article: any): void {
  //   this.dialog.open(ArticleDetailsDialogComponent, {
  //
  //   });
  // }
  openDialog(article: any) {
    this.dialog.open(ArticleDetailsDialogComponent,{
      width: '990px',
      data: article
    });
  }
  closePanels() {
    this.showAddArticle = false;
    this.showEditArticle = false;
  }

  exportToCSV() {
    const headers = ['ID', 'Code Article', 'Designation', 'Prix Unitaire', 'Taux TVA', 'Prix TTC', 'Categorie'];
    const rows = this.dataSource.data.map((item: { id: any; codeArticle: any; designation: any; prixUnitaire: any; tauxTVA: any; prixUnitaireTTC: any; categories: any; }) => [
      item.id,
      item.codeArticle,
      item.designation,
      item.prixUnitaire,
      item.tauxTVA,
      item.prixUnitaireTTC,
      item.categories
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'articles.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    this.snackBar.open('Export réussi !', 'Fermer', {
      duration: 3000
    });
  }

  importFromCSV(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        const articlesImportés = result.data.map((row: any) => ({
          id: row['ID'],
          codeArticle: row['Code Article'],
          designation: row['Designation'],
          prixUnitaire: +row['Prix Unitaire'],
          tauxTVA: +row['Taux TVA'],
          prixUnitaireTTC: +row['Prix TTC'],
          categories: row['Categorie']
        }));

        const dialogRef = this.dialog.open(ConfirmImportDialogComponent, {
          width: '600px',
          data: articlesImportés
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dataSource.data.push(...articlesImportés);
            this.dataSource._updateChangeSubscription();
            this.snackBar.open('Importation confirmée !', 'Fermer', { duration: 3000 });
          } else {
            this.snackBar.open('Importation annulée.', 'Fermer', { duration: 3000 });
          }
        });
      }
    });
  }

  downloadCSVTemplate() {
    const headers = ['ID', 'Code Article', 'Designation', 'Prix Unitaire', 'Taux TVA', 'Prix TTC', 'Categorie'];
    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'modele_articles.csv';
    link.click();
  }


}
