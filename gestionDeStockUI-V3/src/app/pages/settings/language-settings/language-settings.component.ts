import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrl: './language-settings.component.css'
})
export class LanguageSettingsComponent implements OnInit {
  selectedLang = 'fr';

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang');
    this.selectedLang = savedLang ?? 'fr';
  }

  onChangeLanguage(lang: string) {
    this.selectedLang = lang;
    localStorage.setItem('lang', lang);
    // Tu peux déclencher ici un service de traduction si nécessaire
  }
}
