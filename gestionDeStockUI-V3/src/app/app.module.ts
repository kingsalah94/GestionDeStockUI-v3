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
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterRow,
  MatHeaderCell,
  MatHeaderCellDef,
  MatTable, MatTableModule
} from "@angular/material/table";
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
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSelect, MatSelectModule} from "@angular/material/select";
import { WidgetComponent } from './componenta/widget/widget.component';
import { ArticleDetailsDialogComponent } from './componenta/article-details-dialog/article-details-dialog.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from '@angular/material/dialog';
import { ViewsComponent } from './pages/dashboard/widgets/views.component';
import { WidgetsOptionsComponent } from './componenta/widget/widgets-options/widgets-options.component';
import {MatButtonToggleGroup, MatButtonToggleModule} from "@angular/material/button-toggle";
import { RevenueComponent } from './pages/dashboard/widgets/revenue.component';
import {WatchTimeComponent} from './pages/dashboard/widgets/watch-time.component';
import {SubscribersComponent} from './pages/dashboard/widgets/subscribers.component';
import { StoreAppComponent } from './store-app/store-app.component';
import {authGuard} from './guard/auth.guard';
import {MatSortHeader, MatSortModule} from '@angular/material/sort';
import {authorizationGuard} from './guard/authorization.guard';
import { DetailsMouvementStockArticlesComponent } from './componenta/details-mouvement-stock-articles/details-mouvement-stock-articles.component';
import { CorrectionStockDialog} from './componenta/correction-stock-dialog/correction-stock-dialog.component';
import { ConfirmImportDialogComponent } from './componenta/confirm-import-dialog/confirm-import-dialog.component';
import { ThemeSettingsComponent } from './pages/settings/theme-settings/theme-settings.component';
import { LanguageSettingsComponent } from './pages/settings/language-settings/language-settings.component';
import { UserSettingsComponent } from './pages/settings/user-settings/user-settings.component';
import { CategorySettingsComponent } from './pages/settings/category-settings/category-settings.component';
import { TvaSettingsComponent } from './pages/settings/tva-settings/tva-settings.component';
import { RolesSettingsComponent } from './pages/settings/roles-settings/roles-settings.component';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgChartsModule} from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { LigneVenteComponent } from './pages/ligne-vente/ligne-vente.component';
import { VenteDetailsDialogComponent } from './componenta/vente-details-dialog/vente-details-dialog.component';

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
    CommandFournisseurComponent,
    SettingsComponent,
    UsersComponent,
    WidgetComponent,
    ArticleDetailsDialogComponent,
    ViewsComponent,
    SubscribersComponent,
    WidgetsOptionsComponent,
    RevenueComponent,
    WatchTimeComponent,
    StoreAppComponent,
    CorrectionStockDialog,
    DetailsMouvementStockArticlesComponent,
    ConfirmImportDialogComponent,
    ThemeSettingsComponent,
    LanguageSettingsComponent,
    UserSettingsComponent,
    CategorySettingsComponent,
    TvaSettingsComponent,
    RolesSettingsComponent,
    CommandClientComponent,
    LigneVenteComponent,
    VenteDetailsDialogComponent
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
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator,
    MatSelectModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonToggleModule,
    MatSortModule,
    FormsModule,
    MatSlideToggleModule,
    NgChartsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    provideAnimationsAsync(),authGuard,authorizationGuard,{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
