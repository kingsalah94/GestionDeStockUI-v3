import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestionDeStockUI-v3';

  collapsed = signal(false);
  sidenavWith = computed(() => this.collapsed() ? '65px' : '250px');
}
