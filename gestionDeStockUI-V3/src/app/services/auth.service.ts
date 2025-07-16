import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public iAuthenticate: boolean = false;
  public username: string | undefined;
  public roles: string[] = [];

  public users: any = {
    admin: { password: '1234', role: 'ADMIN' },
    user: { password: '1234', role: 'USER' },
  };

  constructor(private router: Router) {
    this.loadUserFromLocalStorage();
  }

  public login(username: string, password: string): boolean {
    if (this.users[username] && password === this.users[username]['password']) {
      this.username = username;
      this.iAuthenticate = true;
      this.roles = [this.users[username]['role']]; // correction: c'était 'roles' au lieu de 'role'

      // 🔒 Enregistrer dans localStorage
      const userData = {
        username: this.username,
        roles: this.roles,
        iAuthenticate: this.iAuthenticate,
      };
      localStorage.setItem('authUser', JSON.stringify(userData));

      return true;
    } else {
      return false;
    }
  }

  public logOut(): void {
    this.iAuthenticate = false;
    this.username = undefined;
    this.roles = [];

    // ❌ Supprimer du localStorage
    localStorage.removeItem('authUser');

    this.router.navigateByUrl('/login');
  }

  private loadUserFromLocalStorage(): void {
    const userData = localStorage.getItem('authUser');
    if (userData) {
      const parsed = JSON.parse(userData);
      this.iAuthenticate = parsed.iAuthenticate;
      this.username = parsed.username;
      this.roles = parsed.roles;
    }
  }
}

