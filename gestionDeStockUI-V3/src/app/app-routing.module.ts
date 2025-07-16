import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ArticlesComponent} from './pages/articles/articles.component';
import {CategoriesComponent} from './pages/categories/categories.component';
import {ClientsComponent} from './pages/clients/clients.component';
import {FournisseursComponent} from './pages/fournisseurs/fournisseurs.component';
import {MouvementStockComponent} from './pages/mouvement-stock/mouvement-stock.component';
import {GlobalviewComponent} from './pages/globalview/globalview.component';
import {StatistiqueComponent} from './pages/statistique/statistique.component';
import {CommandClientComponent} from './pages/command-client/command-client.component';
import {CommandFournisseurComponent} from './pages/command-fournisseur/command-fournisseur.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {LoginComponent} from './pages/login/login.component';
import {StoreAppComponent} from './store-app/store-app.component';
import {authGuard} from './guard/auth.guard';
import {authorizationGuard} from './guard/authorization.guard';
import {LigneVenteComponent} from './pages/ligne-vente/ligne-vente.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent,
  },
  {
    path:"login",
    component:LoginComponent,
  },
  {
    path:"store",
    component: StoreAppComponent,
    canActivate: [authGuard],
    children:[
      {
        path:"dashboard",
        component: DashboardComponent,
      },
      {
        path:"globalview",
        component: GlobalviewComponent,
      },
      {
        path:"statistique",
        component: StatistiqueComponent,
      },
      {
        path:"articles",
        component: ArticlesComponent,
      },
      {
        path:"vente",
        component: LigneVenteComponent,
      },
      {
        path:"categories",
        component: CategoriesComponent,
      },
      {
        path:"clients",
        component: ClientsComponent,
      },
      {
        path:"command-clients",
        component: CommandClientComponent,
      },
      {
        path: "fournisseurs",
        component: FournisseursComponent,
      },
      {
        path: "command-fournisseurs",
        component: CommandFournisseurComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate:[authorizationGuard],
        data:{roles:['ADMIN']}
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
