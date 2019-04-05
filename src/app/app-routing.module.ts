import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'changpassword', loadChildren: './pages/changpassword/changpassword.module#ChangpasswordPageModule' },
  { path: 'editprofile', loadChildren: './pages/editprofile/editprofile.module#EditprofilePageModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
