import {Component, ElementRef, inject, OnInit, viewChild} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {elements} from 'chart.js';
import {wrapGrid} from 'animate-css-grid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
store = inject(DashboardService);

dashboard =viewChild.required<ElementRef>('dashboard');

  ngOnInit(): void {
    wrapGrid(this.dashboard().nativeElement, {duration: 300});
  }

}
