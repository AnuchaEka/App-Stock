import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'changpassword/:id', loadChildren: './pages/changpassword/changpassword.module#ChangpasswordPageModule' },
  { path: 'editprofile/:id', loadChildren: './pages/editprofile/editprofile.module#EditprofilePageModule'},
  { path: 'account/:id', loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'stocklist', loadChildren: './pages/stocklist/stocklist.module#StocklistPageModule' },
  { path: 'stockdetail/:id/:name', loadChildren: './pages/stockdetail/stockdetail.module#StockdetailPageModule' },
  { path: 'stocklost', loadChildren: './pages/stocklost/stocklost.module#StocklostPageModule' },
  { path: 'producttostock', loadChildren: './pages/producttostock/producttostock.module#ProducttostockPageModule' },
  { path: 'confrimstock', loadChildren: './pages/confrimstock/confrimstock.module#ConfrimstockPageModule' },
  { path: 'cutstockshop', loadChildren: './pages/cutstockshop/cutstockshop.module#CutstockshopPageModule' },
  { path: 'cutstocktoshop/:id/:name', loadChildren: './pages/cutstocktoshop/cutstocktoshop.module#CutstocktoshopPageModule' },
  { path: 'cutstockhistory/:id/:name', loadChildren: './pages/cutstockhistory/cutstockhistory.module#CutstockhistoryPageModule' },
  { path: 'backtoshop', loadChildren: './pages/backtoshop/backtoshop.module#BacktoshopPageModule' },
  { path: 'backtostock/:id/:name', loadChildren: './pages/backtostock/backtostock.module#BacktostockPageModule' },
  { path: 'cutstockhistorylist/:id/:name/:pid', loadChildren: './pages/cutstockhistorylist/cutstockhistorylist.module#CutstockhistorylistPageModule' },
  { path: 'backstockhistory/:id/:name', loadChildren: './pages/backstockhistory/backstockhistory.module#BackstockhistoryPageModule' },
  { path: 'backstockhistorylist/:id/:name/:pid', loadChildren: './pages/backstockhistorylist/backstockhistorylist.module#BackstockhistorylistPageModule' },  { path: 'producttoshop', loadChildren: './pages/producttoshop/producttoshop.module#ProducttoshopPageModule' },
  { path: 'confrimshop', loadChildren: './pages/confrimshop/confrimshop.module#ConfrimshopPageModule' },
  { path: 'sellproduct', loadChildren: './pages/sellproduct/sellproduct.module#SellproductPageModule' },








  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
