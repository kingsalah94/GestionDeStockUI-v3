import { Component } from '@angular/core';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent {
  kpiData = [
    { label: 'Articles', value: 128, icon: 'inventory_2' },
    { label: 'Clients', value: 42, icon: 'people' },
    { label: 'Fournisseurs', value: 18, icon: 'local_shipping' },
    { label: 'Commandes Client', value: 76, icon: 'shopping_cart' },
    { label: 'Commandes Fournisseur', value: 34, icon: 'receipt_long' },
  ];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  lineChartLabels = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'];
  lineChartData = [
    {
      data: [100, 120, 90, 150, 130, 180],
      label: 'Commandes Client'
    },
    {
      data: [80, 95, 60, 100, 110, 130],
      label: 'Commandes Fournisseur'
    }
  ];

  pieChartLabels = ['En stock', 'Sortie', 'Commandé'];
  pieChartData = [
    {
      data: [60, 25, 15],
      label: 'Distribution Stock'
    }
  ];
}
