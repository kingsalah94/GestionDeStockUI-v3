import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatToolbarModule, MatToolbarRow} from '@angular/material/toolbar';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatList, MatListModule} from '@angular/material/list';
import {MatExpansionModule,} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadge, MatBadgeModule} from '@angular/material/badge';
import {MatChip, MatChipsModule} from '@angular/material/chips';
import {MatFooterRow} from "@angular/material/table";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { SideBarComponent } from './componenta/side-bar/side-bar.component';
import {NgOptimizedImage} from '@angular/common';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { FournisseursComponent } from './pages/fournisseurs/fournisseurs.component';
import { MouvementStockComponent } from './pages/mouvement-stock/mouvement-stock.component';
import { LoginComponent } from './pages/login/login.component';
import { StatistiqueComponent } from './pages/statistique/statistique.component';
import { GlobalviewComponent } from './pages/globalview/globalview.component';
import { CommandClientComponent } from './pages/command-client/command-client.component';
import { CommandFournisseurComponent } from './pages/command-fournisseur/command-fournisseur.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
    ArticlesComponent,
    CategoriesComponent,
    ClientsComponent,
    FournisseursComponent,
    MouvementStockComponent,
    LoginComponent,
    StatistiqueComponent,
    GlobalviewComponent,
    CommandClientComponent,
    CommandFournisseurComponent,
    SettingsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatBadgeModule,
    MatChipsModule,
    MatMenuTrigger,
    MatMenuModule,
    NgOptimizedImage,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
