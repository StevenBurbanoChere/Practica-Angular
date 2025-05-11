import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PokemonesComponent } from './pages/pokemones/pokemones.component';
import { DbzComponent } from './pages/dbz/dbz.component';
import { ErrorComponent } from './pages/error/error.component';
import { CoctelesComponent } from './pages/cocteles/cocteles.component';
import { OpenlibraryComponent } from './pages/openlibrary/openlibrary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pokemones', component: PokemonesComponent },
  { path: 'dbz', component: DbzComponent },
  { path: 'cocteles', component: CoctelesComponent },
  { path: 'openlibrary', component: OpenlibraryComponent },
  {
    path: 'miapi',
    loadChildren: () =>
      import('./pages/miapi/miapi-routing.module').then(
        (m) => m.MiapiRoutingModule
      ),
  },
  { path: '**', component: ErrorComponent },
];
