import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'usuario', loadChildren: './pages/usuario/usuario.module#UsuarioPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'popup', loadChildren: './pages/popup/popup.module#PopupPageModule' },
  { path: 'historial/:tipo', loadChildren: './pages/historial/historial.module#HistorialPageModule' },
  { path: 'horario', loadChildren: './pages/horario/horario.module#HorarioPageModule' },
  { path: 'historial-one', loadChildren: './pages/historial-one/historial-one.module#HistorialOnePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
