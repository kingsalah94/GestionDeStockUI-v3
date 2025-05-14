import {Component, computed, Input, signal} from '@angular/core';
import {Router} from '@angular/router';

export type MenuItem={
  icon: string;
  label: string;
  route: string;
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  sidNavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sidNavCollapsed.set(value)
  }
  constructor(private router:Router) {
  }
  public profilePic ='assets/salah.png';
  profilePicSize = computed(() => this.sidNavCollapsed() ? '32' : '100');
  menuItems = signal<MenuItem[]>([
    {
      icon:'dashboard',
      label: 'Dashboard',
      route: "/dashboard"
    },{
      icon:'pie_chart',
      label: 'globale view',
      route: '/globalview'
    },{
      icon:'bar_chart',
      label: 'Statistique',
      route: '/statistique'
    },{
      icon:'list_alt',
      label: 'Articles',
      route: '/articles'
    },{
      icon:'timeline',
      label: 'MouvementDeStock',
      route: '/mouvementStock'
    },{
      icon:'people',
      label: 'Clients',
      route: '/clients'
    },{
      icon:'shopping_cart_outlined',
      label: 'Command Client',
      route: '/command-clients'
    },{
      icon:'storefront',
      label: 'Fournisseurs',
      route: '/fournisseurs'
    },{
      icon:'inventory',
      label: 'Commande Fournisseurs',
      route: '/command-fournisseurs'
    },
  ])

  navigate(route?: string): void {
    this.router.navigate([route]);
  }
}
