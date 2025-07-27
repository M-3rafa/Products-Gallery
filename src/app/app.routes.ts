import { DetalilsComponent } from './pages/detalils/detalils.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { title } from 'process';
import { ShopeComponent } from './pages/shope/shope.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('../app/pages/home/home.component').then((c) => c.HomeComponent),
    title: 'home',
  },
  {
    path: 'shope',
    loadComponent: () =>
      import('../app/pages/shope/shope.component').then(
        (c) => c.ShopeComponent
      ),
    title: 'shope',
  },

  {
    path: 'detalils/:id',
    loadComponent: () =>
      import('../app/pages/detalils/detalils.component').then(
        (c) => c.DetalilsComponent
      ),
    title: 'detalils',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../app/pages/cart/cart.component').then((c) => c.CartComponent),
    title: 'My Cart',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, title: 'NotFound!' },
];
