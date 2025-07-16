import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  collapsed = false;
  activeTab = 'theme';

  menuItems = [
    { key: 'theme', label: 'Thème', icon: 'brightness_6' },
    { key: 'langue', label: 'Langue', icon: 'language' },
    { key: 'utilisateurs', label: 'Utilisateurs', icon: 'group' },
    { key: 'categories', label: 'Catégories', icon: 'category' },
    { key: 'tva', label: 'TVA', icon: 'percent' },
    { key: 'roles', label: 'Rôles', icon: 'admin_panel_settings' },
  ];

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
