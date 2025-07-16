import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrl: './theme-settings.component.css'
})
export class ThemeSettingsComponent implements OnInit {
  isDarkTheme = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;
    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
}
