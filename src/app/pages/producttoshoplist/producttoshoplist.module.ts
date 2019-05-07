import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProducttoshoplistPage } from './producttoshoplist.page';

const routes: Routes = [
  {
    path: '',
    component: ProducttoshoplistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProducttoshoplistPage]
})
export class ProducttoshoplistPageModule {}
