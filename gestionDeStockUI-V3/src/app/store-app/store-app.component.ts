import {Component, computed, signal} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-app',
  templateUrl: './store-app.component.html',
  styleUrl: './store-app.component.css'
})
export class StoreAppComponent {
  collapsed = signal(false);
  sidenavWith = computed(() => this.collapsed() ? '65px' : '250px');
  constructor(private router: Router, protected authService: AuthService) {}

  logOut() {
    this.authService.logOut();
  }
}
