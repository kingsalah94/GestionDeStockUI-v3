import { Component } from '@angular/core';
import {ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-globalview',
  templateUrl: './globalview.component.html',
  styleUrl: './globalview.component.css'
})
export class GlobalviewComponent {
  statistics = [
    { icon: 'inventory', title: 'Total Articles', value: 234, variation: 4.5 },
    { icon: 'group', title: 'Total Clients', value: 120, variation: -2.1 },
    { icon: 'local_shipping', title: 'Fournisseurs', value: 45, variation: 1.0 },
    { icon: 'shopping_cart', title: 'Cmd. Clients', value: 87, variation: 6.8 },
    { icon: 'assignment', title: 'Cmd. Fournisseurs', value: 54, variation: -1.3 },
    { icon: 'store', title: 'Stock Actuel', value: 1390, variation: 2.7 },
  ];


  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Articles', 'Clients', 'Fournisseurs', 'Cmd Client', 'Cmd Fournisseur'],
    datasets: [
      {
        label: 'Répartition',
        data: [234, 120, 45, 87, 54],
        backgroundColor: '#3f51b5',
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['En stock', 'Commandés', 'Réservés'],
    datasets: [
      {
        data: [1390, 200, 100],
        backgroundColor: ['#3f51b5', '#ff9800', '#e91e63']
      }
    ]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  startDate!: Date;
  endDate!: Date;

  lastOrders = [
    { client: 'Ali', date: new Date('2024-06-01'), total: 12000, status: 'Livrée' },
    { client: 'Fatou', date: new Date('2024-06-03'), total: 15000, status: 'En cours' },
    { client: 'Seydou', date: new Date('2024-06-05'), total: 10000, status: 'Livrée' },
  ];

  applyDateFilter() {
    // Filtrage selon la période (exemple de base à adapter selon les données réelles)
    this.lastOrders = this.lastOrders.filter(order => {
      return (!this.startDate || new Date(order.date) >= this.startDate)
        && (!this.endDate || new Date(order.date) <= this.endDate);
    });
  }

}
