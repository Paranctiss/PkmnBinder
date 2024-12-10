import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./catalog/catalog.component').then(m => m.CatalogComponent)
  },
  {
    path: 'collection',
    loadComponent: () => import('./collection/collection.component').then(m => m.CollectionComponent)
  },
  { path: '**', redirectTo: '/auth' } // Gestion des routes inexistantes
];
